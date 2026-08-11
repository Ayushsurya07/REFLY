'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/contexts/CartContext';

interface ProductInfoProps {
  product: typeof import('./ProductPageClient').productData;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<null | { available: boolean; days: string; cod: boolean }>(null);
  const [checkingPin, setCheckingPin] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const gstAmount = Math.round((product.price * product.gstRate) / (100 + product.gstRate));
  const basePrice = product.price - gstAmount;

  const checkPincode = () => {
    if (pincode.length !== 6) return;
    setCheckingPin(true);
    setTimeout(() => {
      setPincodeResult({
        available: true,
        days: '3-5 business days',
        cod: true,
      });
      setCheckingPin(false);
    }, 800);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      variant: selectedColor,
      size: selectedSize.startsWith('W') ? selectedSize : `W${selectedSize}`,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0]?.src || '',
      qty,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      variant: selectedColor,
      size: selectedSize.startsWith('W') ? selectedSize : `W${selectedSize}`,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0]?.src || '',
      qty,
    });
    router.push('/checkout');
  };

  return (
    <div className="py-4 lg:py-0">
      {/* Category + SKU */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-gold">
          {product.category} · {product.fit} Fit
        </span>
        <span className="font-body text-xs text-muted-foreground">SKU: {product.sku}</span>
      </div>

      {/* Name */}
      <h1 className="font-display font-bold text-3xl lg:text-4xl leading-tight tracking-tight mb-4">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="font-display font-semibold text-sm">{product.rating}</span>
        <span className="font-body text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
      </div>

      {/* Pricing */}
      <div className="p-5 border border-border mb-6 bg-muted/30">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="price-tag text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="font-body text-base text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
          <span className="tag-label bg-green-100 text-green-800 px-2 py-1 text-xs">
            {product.discount}% OFF
          </span>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          MRP ₹{product.mrp.toLocaleString('en-IN')} · You save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Inclusive of GST ({product.gstRate}%) · Base: ₹{basePrice.toLocaleString('en-IN')} + GST: ₹{gstAmount.toLocaleString('en-IN')}
        </p>
        {product.offer && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="font-display text-xs font-semibold text-gold tracking-wide">
              🎁 {product.offer}
            </p>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-xs font-semibold tracking-widest uppercase">Color</span>
          <span className="font-body text-sm text-muted-foreground">{selectedColor}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(color.name)}
              aria-label={`Select color ${color.name}`}
              disabled={!color.available}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color.name ? 'border-foreground scale-110' : 'border-transparent hover:border-border'
              } ${!color.available ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor === color.name && (
                <span className="absolute inset-0 rounded-full border-2 border-white scale-75" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-xs font-semibold tracking-widest uppercase">Waist Size</span>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="font-body text-xs text-muted-foreground hover:text-gold transition-colors underline"
          >
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => size.available && setSelectedSize(size.label)}
              aria-label={`Select size ${size.label}`}
              disabled={!size.available}
              className={`size-btn ${selectedSize === size.label ? 'selected' : ''} ${!size.available ? 'out-of-stock' : ''}`}
            >
              {size.label}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="font-body text-xs text-muted-foreground mt-2">Please select a size</p>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <span className="font-display text-xs font-semibold tracking-widest uppercase block mb-3">Quantity</span>
        <div className="flex items-center gap-0 border border-border w-fit">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors border-r border-border"
          >
            <Icon name="MinusIcon" size={16} />
          </button>
          <span className="w-12 h-12 flex items-center justify-center font-display font-bold text-sm">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors border-l border-border"
          >
            <Icon name="PlusIcon" size={16} />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`btn-primary w-full py-5 text-sm relative overflow-hidden transition-all duration-300 ${
            !selectedSize ? 'opacity-50 cursor-not-allowed' : ''
          } ${addedToCart ? '!bg-green-800' : ''}`}
        >
          {addedToCart ? '✓ Added to Bag' : !selectedSize ? 'Select Waist Size to Add' : 'Add to Bag'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!selectedSize}
          className={`btn-ghost w-full py-5 text-sm transition-colors cursor-pointer ${!selectedSize ? 'opacity-40 cursor-not-allowed' : 'hover:bg-foreground hover:text-background'}`}
        >
          Buy Now
        </button>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="flex items-center justify-center gap-2 w-full py-3 border border-border hover:border-gold transition-colors font-display text-xs font-semibold tracking-widest uppercase"
        >
          <Icon name="HeartIcon" size={16} variant={wishlisted ? 'solid' : 'outline'} className={wishlisted ? 'text-gold' : ''} />
          {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Delivery + Trust */}
      <div className="border border-border p-5 mb-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">🚚</span>
          <div>
            <p className="font-display font-semibold text-xs tracking-wide uppercase">Free Delivery</p>
            <p className="font-body text-xs text-muted-foreground">On all orders above ₹1,500 · Pan India</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">↩</span>
          <div>
            <p className="font-display font-semibold text-xs tracking-wide uppercase">7-Day Returns</p>
            <p className="font-body text-xs text-muted-foreground">Easy returns & exchanges</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">💳</span>
          <div>
            <p className="font-display font-semibold text-xs tracking-wide uppercase">Cash on Delivery</p>
            <p className="font-body text-xs text-muted-foreground">Available · Additional ₹50 charge</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">⚡</span>
          <div>
            <p className="font-display font-semibold text-xs tracking-wide uppercase">Ships in 24 Hours</p>
            <p className="font-body text-xs text-muted-foreground">Order before 2 PM for same-day dispatch</p>
          </div>
        </div>
      </div>

      {/* PIN Code Checker */}
      <div className="border border-border p-5 mb-6">
        <p className="font-display font-semibold text-xs tracking-widest uppercase mb-3">
          Check Delivery
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ''));
              setPincodeResult(null);
            }}
            placeholder="Enter PIN code"
            aria-label="Enter PIN code to check delivery"
            className="input-luxury flex-1 text-sm"
          />
          <button
            onClick={checkPincode}
            disabled={pincode.length !== 6 || checkingPin}
            className="px-4 py-2 bg-primary text-primary-foreground font-display text-xs font-semibold tracking-widest uppercase hover:bg-hover transition-colors disabled:opacity-40"
          >
            {checkingPin ? '...' : 'Check'}
          </button>
        </div>
        {pincodeResult && (
          <div className="mt-3 p-3 bg-green-50 border border-green-100">
            <p className="font-body text-xs text-green-800">
              ✓ Delivery available · <strong>{pincodeResult.days}</strong>
              {pincodeResult.cod && ' · COD available'}
            </p>
          </div>
        )}
      </div>

      {/* Share */}
      <div className="flex items-center gap-4">
        <span className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground">Share:</span>
        {['WhatsApp', 'Instagram', 'Copy Link'].map((platform) => (
          <button
            key={platform}
            aria-label={`Share on ${platform}`}
            className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSizeGuideOpen(false)}>
          <div className="bg-white max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl tracking-tight">Size Guide</h2>
              <button onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Measure your natural waist (the narrowest part of your torso) for the best fit.
            </p>
            <table className="w-full text-sm font-body border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-display font-semibold text-xs tracking-widest uppercase">Size</th>
                  <th className="text-left py-3 font-display font-semibold text-xs tracking-widest uppercase">Waist (inches)</th>
                  <th className="text-left py-3 font-display font-semibold text-xs tracking-widest uppercase">Waist (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['28', '28–29', '71–74'],
                  ['30', '30–31', '76–79'],
                  ['32', '32–33', '81–84'],
                  ['34', '34–35', '86–89'],
                  ['36', '36–37', '91–94'],
                  ['38', '38–39', '97–99'],
                  ['40', '40–41', '102–104'],
                  ['42', '42–43', '107–109'],
                ].map(([size, inch, cm]) => (
                  <tr key={size} className="border-b border-border/50">
                    <td className="py-3 font-display font-semibold">{size}</td>
                    <td className="py-3 text-muted-foreground">{inch}</td>
                    <td className="py-3 text-muted-foreground">{cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-4 bg-muted">
              <p className="font-display font-semibold text-xs tracking-widest uppercase mb-2">Model Measurements</p>
              <p className="font-body text-sm text-muted-foreground">Height: 6&apos;1&quot; (185 cm) · Waist: 32&quot; · Wearing size 32</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}