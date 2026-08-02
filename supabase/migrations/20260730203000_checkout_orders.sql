-- Orders module migration
-- Creates orders and order_items tables with Indian address fields and GST breakdown

-- 1. ENUM types
DROP TYPE IF EXISTS public.order_status CASCADE;
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

DROP TYPE IF EXISTS public.shipping_method CASCADE;
CREATE TYPE public.shipping_method AS ENUM ('standard', 'express', 'overnight');

DROP TYPE IF EXISTS public.payment_method CASCADE;
CREATE TYPE public.payment_method AS ENUM ('cod', 'upi', 'card', 'netbanking', 'wallet');

-- 2. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    -- Guest info (for guest checkout)
    guest_email TEXT,
    guest_name TEXT,
    guest_phone TEXT,
    -- Indian address fields
    address_flat TEXT NOT NULL,
    address_area TEXT NOT NULL,
    address_landmark TEXT,
    address_city TEXT NOT NULL,
    address_district TEXT NOT NULL,
    address_state TEXT NOT NULL,
    address_pin TEXT NOT NULL,
    -- Shipping
    shipping_method public.shipping_method NOT NULL DEFAULT 'standard',
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    -- Pricing breakdown
    subtotal NUMERIC(10,2) NOT NULL,
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    coupon_code TEXT,
    cgst_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    sgst_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    igst_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,
    -- Payment
    payment_method public.payment_method NOT NULL DEFAULT 'cod',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    -- Status
    order_status public.order_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    variant TEXT,
    size TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    mrp NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_guest_email ON public.orders(guest_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- 5. Function: auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_orders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 6. Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for orders
-- Authenticated users can view their own orders
DROP POLICY IF EXISTS "users_view_own_orders" ON public.orders;
CREATE POLICY "users_view_own_orders"
ON public.orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Authenticated users can insert orders (user_id must match)
DROP POLICY IF EXISTS "users_insert_own_orders" ON public.orders;
CREATE POLICY "users_insert_own_orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Anon users can insert guest orders (user_id must be null)
DROP POLICY IF EXISTS "anon_insert_guest_orders" ON public.orders;
CREATE POLICY "anon_insert_guest_orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Authenticated users can update their own orders (limited)
DROP POLICY IF EXISTS "users_update_own_orders" ON public.orders;
CREATE POLICY "users_update_own_orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- RLS Policies for order_items
-- Authenticated users can view items of their orders
DROP POLICY IF EXISTS "users_view_own_order_items" ON public.order_items;
CREATE POLICY "users_view_own_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND o.user_id = auth.uid()
    )
);

-- Authenticated users can insert items for their orders
DROP POLICY IF EXISTS "users_insert_own_order_items" ON public.order_items;
CREATE POLICY "users_insert_own_order_items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND o.user_id = auth.uid()
    )
);

-- Anon users can insert items for guest orders
DROP POLICY IF EXISTS "anon_insert_guest_order_items" ON public.order_items;
CREATE POLICY "anon_insert_guest_order_items"
ON public.order_items
FOR INSERT
TO anon
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND o.user_id IS NULL
    )
);

-- 8. Trigger for updated_at
DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_orders_updated_at();
