-- Wishlist module migration
-- Creates wishlist table for user dashboard

-- 1. wishlist table
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    product_mrp NUMERIC(10,2) NOT NULL DEFAULT 0,
    image_url TEXT,
    variant TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON public.wishlist(product_id);

-- 3. Enable RLS
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DROP POLICY IF EXISTS "users_manage_own_wishlist" ON public.wishlist;
CREATE POLICY "users_manage_own_wishlist"
ON public.wishlist
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
