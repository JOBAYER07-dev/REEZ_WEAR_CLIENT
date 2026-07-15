'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function ManageOrdersPage() {
  const { data: session, isPending } = authClient.useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch('/api/orders', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.role === 'admin') {
      fetchOrders();
    }
  }, [session]);

  const handleConfirmOrder = async (orderId: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'confirmed' }),
      });

      if (!res.ok) {
        toast.error('Failed to update order status. Please try again later.');
        return;
      }

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'confirmed' } : order,
        ),
      );
      toast.success('Order successfully confirmed!');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isPending)
    return (
      <p className="text-sm text-[var(--color-neutral)] p-10 text-center">
        Loading...
      </p>
    );

  if (session?.user?.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="bg-white border border-black/5 rounded-2xl p-8 inline-flex flex-col items-center gap-3">
          <ShieldAlert size={40} className="text-red-500" />
          <p className="text-[var(--color-neutral)] text-sm">
            You are not authorized to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/dashboard"
        data-cursor-hover
        className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral)] hover:text-black mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-serif italic mb-1 flex items-center gap-2">
          <ClipboardList size={24} /> Customer Orders
        </h1>
        <p className="text-[var(--color-neutral)] text-sm">
          Total {orders.length} order{orders.length !== 1 ? 's' : ''} placed by
          users
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-white border border-black/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center text-[var(--color-neutral)]">
          You haven't received any orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-sm transition-all"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-base">{order.name}</h3>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase ${
                      order.status === 'confirmed'
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-neutral)]">
                  <span className="font-medium text-black">Phone:</span>{' '}
                  {order.phone} | silent{' '}
                  <span className="font-medium text-black">Payment:</span>{' '}
                  {order.paymentMethod.toUpperCase()}
                </p>
                <p className="text-xs text-[var(--color-neutral)]">
                  <span className="font-medium text-black">Address:</span>{' '}
                  {order.address}
                </p>

                <div className="mt-3 bg-[var(--color-bg)]/50 p-3 rounded-xl border border-black/5">
                  <p className="text-xs font-semibold mb-1.5 uppercase text-[var(--color-neutral)]">
                    Ordered Items:
                  </p>
                  <ul className="text-xs space-y-1 divide-y divide-black/5">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="pt-1 first:pt-0 flex justify-between"
                      >
                        <span>
                          {item.title}{' '}
                          <span className="text-[var(--color-neutral)]">
                            x{item.quantity}
                            Espn
                          </span>
                        </span>
                        <span className="font-medium">
                          {item.price * item.quantity} BDT
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:items-end justify-between shrink-0 gap-3 min-w-[140px]">
                <div className="text-left md:text-right">
                  <p className="text-xs text-[var(--color-neutral)]">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-[var(--color-text)]">
                    {order.totalAmount} BDT
                  </p>
                  <p className="text-[10px] text-[var(--color-neutral)] flex items-center md:justify-end gap-1 mt-0.5">
                    <Clock size={10} />{' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {order.status === 'pending' ? (
                  <button
                    onClick={() => handleConfirmOrder(order.id)}
                    disabled={updatingId === order.id}
                    data-cursor-hover
                    className="w-full bg-[var(--color-text)] text-white text-xs font-semibold py-2.5 px-4 rounded-full hover:bg-[var(--color-accent)] hover:text-black transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Check size={14} />
                    {updatingId === order.id
                      ? 'Confirming...'
                      : 'Confirm Order'}
                  </button>
                ) : (
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1 w-full justify-center">
                    <Check size={14} /> Confirmed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
