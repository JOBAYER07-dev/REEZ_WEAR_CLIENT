'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, CreditCard, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartCount, clearCart } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const deliveryCharge = address.toLowerCase().includes('dhaka') ? 70 : 130;
  const totalAmount = subtotal + deliveryCharge;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error('Shob required field pooron koro');
      return;
    }

    setLoading(true);
    try {
      // 🎯 NEXT_PUBLIC_API_URL bade shorasori relative path use kora holo jate rewrite tunnel kaj kore
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          phone,
          address,
          paymentMethod,
          items: cartItems.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
          subtotal,
          deliveryCharge,
          totalAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Order place korte problem hoyeche');
        setLoading(false);
        return;
      }

      setIsSubmitted(true);
      clearCart();
      toast.success('Order successfully placed!');
    } catch (error) {
      console.error(error);
      toast.error('Server connect korte problem hoyeche, abar try koro');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6">
        <div className="bg-white border border-black/5 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-sm">
          <CheckCircle2 size={50} className="text-[var(--color-accent)]" />
          <h1 className="text-2xl font-serif italic font-semibold">
            Order Confirmed!
          </h1>
          <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
            Thank you for your order. We will contact you soon to confirm the
          </p>
          <button
            onClick={() => router.push('/shop')}
            className="mt-4 w-full bg-[var(--color-text)] text-white py-3 rounded-full text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-black transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral)] hover:text-black mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </Link>
      <h1 className="text-3xl font-serif italic mb-8">Checkout Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        <form
          onSubmit={handlePlaceOrder}
          className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 flex flex-col gap-5"
        >
          <h2 className="text-lg font-semibold border-b border-black/5 pb-3">
            Delivery Information
          </h2>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Full Delivery Address *
            </label>
            <textarea
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter the house number, street, area, city, and postal code. Delivery charge is 70 BDT for Dhaka and 130 BDT for outside Dhaka."
              rows={3}
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] resize-none bg-[var(--color-bg)]/35"
            />
          </div>
          <h2 className="text-lg font-semibold border-b border-black/5 pb-3 mt-4">
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-black/10'}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-black"
                />
                <span className="text-sm font-medium">Cash on Delivery</span>
              </div>
            </label>
            <label
              className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'bkash' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-black/10'}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="accent-black"
                />
                <span className="text-sm font-medium">bKash / Nagad</span>
              </div>
              <CreditCard size={16} className="text-[var(--color-neutral)]" />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading || cartCount === 0}
            className="w-full bg-[var(--color-text)] text-white font-semibold py-4 rounded-full mt-4 hover:bg-[var(--color-accent)] hover:text-black transition-colors disabled:opacity-40"
          >
            {loading
              ? 'Processing Order...'
              : `Confirm Order (${cartCount > 0 ? totalAmount : 0})`}
          </button>
        </form>
        <aside className="bg-white border border-black/5 rounded-2xl p-6 sticky top-24">
          <h2 className="text-lg font-semibold border-b border-black/5 pb-3 flex items-center gap-2">
            <ShoppingBag size={18} /> Order Summary
          </h2>
          <div className="divide-y divide-black/5 max-h-60 overflow-y-auto my-4 pr-1">
            {cartItems.length === 0 ? (
              <p className="text-sm text-[var(--color-neutral)] py-4 text-center">
                Cart is empty.
              </p>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-medium truncate">{item.product.title}</p>
                    <p className="text-xs text-[var(--color-neutral)]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium shrink-0">
                    {item.product.price * item.quantity}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-black/10 pt-4 flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between text-[var(--color-neutral)]">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between text-[var(--color-neutral)]">
              <span>Delivery Charge</span>
              <span>{cartCount > 0 ? deliveryCharge : 0}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t border-black/5 pt-3 mt-1">
              <span>Total Amount</span>
              <span>{cartCount > 0 ? totalAmount : 0}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
