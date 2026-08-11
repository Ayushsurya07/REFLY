'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { createClient } from '@/lib/supabase/client';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  variant: string;
  size: string;
  price: number;
  mrp: number;
  qty: number;
  image: string;
}

interface AddressForm {
  fullName: string;
  phone: string;
  email: string;
  flat: string;
  area: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  pin: string;
}

interface ShippingOption {
  id: 'standard' | 'express' | 'overnight';
  label: string;
  description: string;
  price: number;
  eta: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MOCK_CART: CartItem[] = [
  {
    id: '1',
    name: 'Obsidian Slim Jeans',
    variant: 'Jet Black',
    size: 'W32',
    price: 2999,
    mrp: 4999,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80',
  },
  {
    id: '2',
    name: 'Utility Cargo Pants',
    variant: 'Olive Drab',
    size: 'W34',
    price: 3499,
    mrp: 5499,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80',
  },
];

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', label: 'Standard Delivery', description: 'Regular shipping across India', price: 0, eta: '5–7 business days' },
  { id: 'express', label: 'Express Delivery', description: 'Priority handling & faster transit', price: 149, eta: '2–3 business days' },
  { id: 'overnight', label: 'Overnight Delivery', description: 'Next-day delivery to metro cities', price: 349, eta: '1 business day' },
];

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir',
  'Ladakh','Lakshadweep','Puducherry',
];

const GST_RATE = 0.18; // 18% GST on apparel above ₹1000
const CGST_RATE = 0.09;
const SGST_RATE = 0.09;

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ['Cart Review', 'Address', 'Shipping', 'Payment'];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === step;
        const isDone = idx < step;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-display font-bold border transition-all duration-300 ${
                  isDone
                    ? 'bg-gold border-gold text-black'
                    : isActive
                    ? 'bg-black border-black text-white' :'bg-white border-border text-muted-foreground'
                }`}
              >
                {isDone ? <Icon name="CheckIcon" size={14} /> : idx}
              </div>
              <span
                className={`text-[10px] font-display font-semibold tracking-wider uppercase hidden sm:block ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-px mb-5 transition-all duration-300 ${
                  isDone ? 'bg-gold' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Step 1: Cart Review ─────────────────────────────────────────────────────

function CartReview({
  items,
  setItems,
  onNext,
}: {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onNext: () => void;
}) {
  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="font-display font-semibold text-lg mb-2">Your bag is empty</p>
        <Link href="/collections" className="btn-primary inline-block mt-4">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display font-bold text-xl tracking-wide uppercase mb-6">Cart Review</h2>
      <div className="space-y-4 mb-8">
        {items.map((item, idx) => (
          <div key={`${item.id}-${item.size || ''}-${idx}`} className="flex gap-4 p-4 border border-border bg-white">
            <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-muted">
              <AppImage
                src={item.image}
                alt={`${item.name} — ${item.variant}`}
                width={80}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    {item.variant} · Size {item.size}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="text-muted-foreground hover:text-red-500 transition-colors ml-2"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-muted-foreground line-through font-body">
                    ₹{item.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-green-600 font-semibold font-body">
                    {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
                  </span>
                </div>
                <div className="flex items-center gap-2 border border-border">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="MinusIcon" size={12} />
                  </button>
                  <span className="font-display font-semibold text-sm w-5 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Icon name="PlusIcon" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="btn-primary w-full">
        Proceed to Address →
      </button>
    </div>
  );
}

// ─── Step 2: Address Form ────────────────────────────────────────────────────

function AddressStep({
  address,
  setAddress,
  isGuest,
  onNext,
  onBack,
}: {
  address: AddressForm;
  setAddress: React.Dispatch<React.SetStateAction<AddressForm>>;
  isGuest: boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const validate = () => {
    const e: Partial<AddressForm> = {};
    if (!address.fullName.trim()) e.fullName = 'Full name is required';
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone)) e.phone = 'Enter valid 10-digit mobile number';
    if (isGuest && (!address.email.trim() || !/\S+@\S+\.\S+/.test(address.email))) e.email = 'Enter valid email';
    if (!address.flat.trim()) e.flat = 'Flat / House No. is required';
    if (!address.area.trim()) e.area = 'Area / Street is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.district.trim()) e.district = 'District is required';
    if (!address.state) e.state = 'State is required';
    if (!address.pin.trim() || !/^\d{6}$/.test(address.pin)) e.pin = 'Enter valid 6-digit PIN code';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext();
  };

  const field = (
    key: keyof AddressForm,
    label: string,
    placeholder: string,
    required = true,
    type = 'text'
  ) => (
    <div>
      <label className="block text-xs font-display font-semibold tracking-wider uppercase text-muted-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={address[key]}
        onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`input-luxury w-full text-sm ${errors[key] ? 'border-red-400' : ''}`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1 font-body">{errors[key]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="font-display font-bold text-xl tracking-wide uppercase mb-6">Delivery Address</h2>

      <div className="space-y-4">
        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('fullName', 'Full Name', 'Enter your full name')}
          {field('phone', 'Mobile Number', '10-digit mobile number', true, 'tel')}
        </div>
        {isGuest && field('email', 'Email Address', 'your@email.com', true, 'email')}

        {/* Address */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-display font-semibold tracking-wider uppercase text-muted-foreground mb-4">
            Delivery Address
          </p>
          {field('flat', 'Flat / House No. / Building', 'e.g. Flat 4B, Sunrise Apartments')}
          {field('area', 'Area / Street / Colony', 'e.g. MG Road, Koramangala')}
          {field('landmark', 'Landmark', 'e.g. Near City Mall', false)}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('city', 'City', 'e.g. Bengaluru')}
            {field('district', 'District', 'e.g. Bengaluru Urban')}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-semibold tracking-wider uppercase text-muted-foreground mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={address.state}
                onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                className={`input-luxury w-full text-sm ${errors.state ? 'border-red-400' : ''}`}
              >
                <option value="">Select State / UT</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className="text-xs text-red-500 mt-1 font-body">{errors.state}</p>}
            </div>
            {field('pin', 'PIN Code', '6-digit PIN code', true, 'text')}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="flex-1 border border-border py-3 font-display text-xs font-semibold tracking-widest uppercase hover:bg-accent transition-colors">
          ← Back
        </button>
        <button onClick={handleSubmit} className="btn-primary flex-1">
          Continue to Shipping →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Shipping ────────────────────────────────────────────────────────

function ShippingStep({
  selected,
  setSelected,
  onNext,
  onBack,
}: {
  selected: ShippingOption['id'];
  setSelected: (id: ShippingOption['id']) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl tracking-wide uppercase mb-6">Shipping Method</h2>
      <div className="space-y-3 mb-8">
        {SHIPPING_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full text-left p-4 border transition-all duration-200 ${
              selected === opt.id
                ? 'border-black bg-black text-white' :'border-border bg-white hover:border-foreground/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selected === opt.id ? 'border-gold' : 'border-current opacity-40'
                  }`}
                >
                  {selected === opt.id && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{opt.label}</p>
                  <p className={`text-xs font-body mt-0.5 ${selected === opt.id ? 'text-white/60' : 'text-muted-foreground'}`}>
                    {opt.description} · {opt.eta}
                  </p>
                </div>
              </div>
              <span className="font-display font-bold text-sm flex-shrink-0 ml-4">
                {opt.price === 0 ? (
                  <span className="text-green-400">FREE</span>
                ) : (
                  `₹${opt.price}`
                )}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border border-border py-3 font-display text-xs font-semibold tracking-widest uppercase hover:bg-accent transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="btn-primary flex-1">
          Review Order →
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Payment & Order Summary ─────────────────────────────────────────

function PaymentStep({
  items,
  address,
  shippingId,
  onBack,
  onPlaceOrder,
  placing,
}: {
  items: CartItem[];
  address: AddressForm;
  shippingId: ShippingOption['id'];
  onBack: () => void;
  onPlaceOrder: (paymentMethod: string) => void;
  placing: boolean;
}) {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const shippingOpt = SHIPPING_OPTIONS.find((s) => s.id === shippingId)!;

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const mrpTotal = items.reduce((acc, i) => acc + i.mrp * i.qty, 0);
  const itemDiscount = mrpTotal - subtotal;
  
  const isFreeShipping = subtotal >= 1500;
  const shippingFee = isFreeShipping ? 0 : (paymentMethod === 'cod' ? 100 : 79);
  const grandTotal = subtotal + shippingFee;
  const includedGst = Math.round((grandTotal * 18) / 118);
  const cgst = Math.round(includedGst / 2);
  const sgst = includedGst - cgst;
  const totalGst = includedGst;

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery (Postpaid)', icon: 'BanknotesIcon', desc: `Pay when order arrives · Shipping: ${isFreeShipping ? 'FREE' : '₹100'}` },
    { id: 'upi', label: 'UPI / QR Code (Prepaid)', icon: 'QrCodeIcon', desc: `GPay, PhonePe, Paytm, BHIM · Shipping: ${isFreeShipping ? 'FREE' : '₹79'}` },
    { id: 'card', label: 'Credit / Debit Card (Prepaid)', icon: 'CreditCardIcon', desc: `Visa, Mastercard, RuPay · Shipping: ${isFreeShipping ? 'FREE' : '₹79'}` },
  ] as const;

  return (
    <div>
      <h2 className="font-display font-bold text-xl tracking-wide uppercase mb-6">Review & Pay</h2>

      {/* Address Summary */}
      <div className="p-4 border border-border bg-muted mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display font-semibold text-sm">{address.fullName}</p>
            <p className="text-xs text-muted-foreground font-body mt-1 leading-relaxed">
              {address.flat}, {address.area}
              {address.landmark ? `, Near ${address.landmark}` : ''}<br />
              {address.city}, {address.district}, {address.state} – {address.pin}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">📞 {address.phone}</p>
          </div>
          <button onClick={onBack} className="text-xs font-display font-semibold text-gold hover:underline flex-shrink-0 ml-4">
            Edit
          </button>
        </div>
      </div>

      {/* Shipping Summary */}
      <div className="p-4 border border-border bg-muted mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-semibold text-sm">{shippingOpt.label}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{shippingOpt.eta}</p>
          </div>
          <span className="font-display font-bold text-sm">
            {isFreeShipping ? <span className="text-green-600">FREE</span> : `₹${shippingFee}`}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <p className="text-xs font-display font-semibold tracking-wider uppercase text-muted-foreground mb-3">
          Payment Method
        </p>
        <div className="space-y-2">
          {paymentOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPaymentMethod(opt.id)}
              className={`w-full text-left p-3.5 border transition-all duration-200 flex items-center gap-3 ${
                paymentMethod === opt.id
                  ? 'border-black bg-black text-white' :'border-border bg-white hover:border-foreground/30'
              }`}
            >
              <div
                className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === opt.id ? 'border-gold' : 'border-current opacity-40'
                }`}
              >
                {paymentMethod === opt.id && <div className="w-2 h-2 rounded-full bg-gold" />}
              </div>
              <div>
                <p className="font-display font-semibold text-sm">{opt.label}</p>
                <p className={`text-xs font-body ${paymentMethod === opt.id ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {opt.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* GST Breakdown */}
      <div className="border border-border p-5 bg-white mb-6">
        <p className="font-display font-semibold text-sm tracking-wide uppercase mb-4">Order Summary</p>
        <div className="space-y-2.5 text-sm font-body">
          <div className="flex justify-between">
            <span className="text-muted-foreground">MRP Total ({items.reduce((a, i) => a + i.qty, 0)} items)</span>
            <span>₹{mrpTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Product Discount</span>
            <span>−₹{itemDiscount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal (excl. GST)</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className={isFreeShipping ? 'text-green-600 font-semibold' : ''}>
              {isFreeShipping ? 'FREE' : `₹${shippingFee} (${paymentMethod === 'cod' ? 'COD' : 'Prepaid'})`}
            </span>
          </div>
          <div className="border-t border-dashed border-border pt-2.5 space-y-1.5">
            <p className="text-xs text-muted-foreground font-display font-semibold tracking-wider uppercase">GST Breakdown</p>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">CGST (9%)</span>
              <span>₹{cgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">SGST (9%)</span>
              <span>₹{sgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Total GST (18%)</span>
              <span>₹{totalGst.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-base">
            <span>Grand Total</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-muted-foreground">Inclusive of all taxes · GST Invoice will be emailed</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border border-border py-3 font-display text-xs font-semibold tracking-widest uppercase hover:bg-accent transition-colors">
          ← Back
        </button>
        <button
          onClick={() => onPlaceOrder(paymentMethod)}
          disabled={placing}
          className="btn-primary flex-2 flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {placing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            `Place Order · ₹${grandTotal.toLocaleString('en-IN')}`
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Order Confirmed ──────────────────────────────────────────────────────────

function OrderConfirmed({ orderNumber, email }: { orderNumber: string; email: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckIcon" size={32} className="text-green-600" />
      </div>
      <h2 className="font-display font-bold text-2xl tracking-wide uppercase mb-2">Order Confirmed!</h2>
      <p className="text-muted-foreground font-body mb-1">
        Your order <span className="font-semibold text-foreground">#{orderNumber}</span> has been placed.
      </p>
      <p className="text-sm text-muted-foreground font-body mb-8">
        A confirmation will be sent to <span className="font-semibold">{email}</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/orders" className="btn-primary">
          Track Order
        </Link>
        <Link
          href="/collections"
          className="border border-border px-6 py-3 font-display text-xs font-semibold tracking-widest uppercase hover:bg-accent transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [items, setItems] = useState<CartItem[]>(() => (cartItems.length > 0 ? cartItems : MOCK_CART));

  React.useEffect(() => {
    if (cartItems.length > 0) {
      setItems(cartItems);
    }
  }, [cartItems]);

  const [address, setAddress] = useState<AddressForm>({
    fullName: user?.user_metadata?.full_name || '',
    phone: '',
    email: user?.email || '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    pin: '',
  });
  const [shippingId, setShippingId] = useState<ShippingOption['id']>('standard');
  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const shippingOpt = SHIPPING_OPTIONS.find((s) => s.id === shippingId)!;
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shippingCost = shippingOpt.price;
  const grandTotal = subtotal + shippingCost;
  const includedGst = Math.round((grandTotal * 18) / 118);
  const cgst = Math.round(includedGst / 2);
  const sgst = includedGst - cgst;

  const generateOrderNumber = () => {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RFL-${ts}-${rand}`;
  };

  const handlePlaceOrder = async (paymentMethod: string) => {
    setPlacing(true);
    setError('');
    const orderNum = generateOrderNumber();

    try {
      const orderPayload = {
        order_number: orderNum,
        user_id: user?.id || null,
        guest_email: !user ? address.email : null,
        guest_name: !user ? address.fullName : null,
        guest_phone: !user ? address.phone : null,
        address_flat: address.flat,
        address_area: address.area,
        address_landmark: address.landmark || null,
        address_city: address.city,
        address_district: address.district,
        address_state: address.state,
        address_pin: address.pin,
        shipping_method: shippingId,
        shipping_cost: shippingCost,
        subtotal,
        discount_amount: 0,
        cgst_amount: cgst,
        sgst_amount: sgst,
        igst_amount: 0,
        total_amount: grandTotal,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending',
        order_status: 'pending',
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select('id')
        .single();

      if (orderError) throw orderError;

      const orderItemsPayload = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        variant: item.variant,
        size: item.size,
        quantity: item.qty,
        unit_price: item.price,
        mrp: item.mrp,
        total_price: item.price * item.qty,
        image_url: item.image,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsPayload);

      if (itemsError) throw itemsError;

      setOrderNumber(orderNum);
      setConfirmed(true);
    } catch (err: any) {
      console.error('Order placement error:', err);
      setError(err?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (confirmed) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-muted pt-24 pb-20">
          <div className="max-w-xl mx-auto px-6">
            <OrderConfirmed
              orderNumber={orderNumber}
              email={user?.email || address.email}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl lg:text-3xl tracking-wide uppercase">Checkout</h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {!user && (
                <>
                  <Link href="/login" className="text-gold hover:underline font-semibold">Sign in</Link>
                  {' '}for faster checkout and order tracking, or continue as guest.
                </>
              )}
              {user && `Logged in as ${user.email}`}
            </p>
          </div>

          <StepIndicator step={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 bg-white border border-border p-6 lg:p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-body">
                  {error}
                </div>
              )}

              {step === 1 && (
                <CartReview items={items} setItems={setItems} onNext={() => setStep(2)} />
              )}
              {step === 2 && (
                <AddressStep
                  address={address}
                  setAddress={setAddress}
                  isGuest={!user}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <ShippingStep
                  selected={shippingId}
                  setSelected={setShippingId}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              )}
              {step === 4 && (
                <PaymentStep
                  items={items}
                  address={address}
                  shippingId={shippingId}
                  onBack={() => setStep(3)}
                  onPlaceOrder={handlePlaceOrder}
                  placing={placing}
                />
              )}
            </div>

            {/* Sidebar: Mini Order Summary */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white border border-border p-5">
                <p className="font-display font-bold text-sm tracking-wide uppercase mb-4">
                  Order Summary
                </p>
                <div className="space-y-3 mb-4">
                  {items.map((item, idx) => (
                    <div key={`summary-${item.id}-${item.size || ''}-${idx}`} className="flex gap-3">
                      <div className="w-12 h-14 flex-shrink-0 overflow-hidden bg-muted relative">
                        <AppImage
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-xs leading-tight truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground font-body">{item.variant} · {item.size}</p>
                        <p className="font-display font-bold text-xs mt-1">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-1.5 text-xs font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{(cgst + sgst).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-sm pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white border border-border p-4 space-y-3">
                {[
                  { icon: 'ShieldCheckIcon', text: 'Secure & Encrypted Checkout' },
                  { icon: 'TruckIcon', text: 'Free Delivery on Standard Orders' },
                  { icon: 'ArrowPathIcon', text: '30-Day Easy Returns' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon name={icon as any} size={16} className="text-gold flex-shrink-0" />
                    <span className="text-xs font-body text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
