'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  ShoppingBag,
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

export default function MyOrdersPage() {
  const { data: session, isPending } = authClient.useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyOrders() {
      setLoading(true);
      try {
        // 🎯 Absolute URL মুছে দিয়ে প্রক্সি রিলেটিভ পাথ ব্যবহার করা হলো যেন কুকি পাস হয়
        const res = await fetch('/api/orders/user/me', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error(error);
        toast.error('Order tracking data load korte problem hoyeche');
      } finally {
        setLoading(false);
      }
    }
    if (session) {
      fetchMyOrders();
    }
  }, [session]);

  if (isPending)
    return (
      <p className="text-sm text-[var(--color-neutral)] p-10 text-center">
        Loading...
      </p>
    );

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif italic mb-1 flex items-center gap-2">
          <Package size={24} /> Track My Orders
        </h1>
        <p className="text-[var(--color-neutral)] text-sm">
          Tomar place kora order gulor bortoman status ekhane dekhte parbe
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white border border-black/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center text-[var(--color-neutral)]">
          <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
          Tumi ekhono kono order koro ni!
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white border border-black/5 rounded-2xl p-5 md:p-6 hover:shadow-sm transition-all flex flex-col gap-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
                <div className="space-y-0.5">
                  <p className="text-xs text-[var(--color-neutral)]">
                    Order ID:{' '}
                    <span className="font-mono text-black font-medium">
                      #{order.id.slice(-8)}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-neutral)] flex items-center gap-1">
                    <Calendar size={12} />{' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-neutral)] font-medium">
                    Status:
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full uppercase flex items-center gap-1 ${
                      order.status === 'confirmed'
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    {order.status === 'confirmed' ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6 items-center">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-[var(--color-neutral)] tracking-wider">
                    Items Ordered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-[var(--color-bg)]/65 border border-black/5 rounded-xl px-3 py-1.5 text-xs font-medium inline-block"
                      >
                        {item.title}{' '}
                        <span className="text-[var(--color-neutral)]">
                          x{item.quantity}
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-neutral)] mt-2">
                    <span className="font-medium text-black">
                      Delivery Address:
                    </span>{' '}
                    {order.address}
                  </p>
                </div>

                <div className="bg-[var(--color-bg)]/35 border border-black/5 p-4 rounded-xl flex flex-col justify-between md:items-end text-left md:text-right">
                  <div>
                    <p className="text-xs text-[var(--color-neutral)]">
                      Total Bill Paid (COD)
                    </p>
                    <p className="text-lg font-bold text-[var(--color-text)]">
                      {order.totalAmount} BDT
                    </p>
                  </div>

                  <div className="w-full mt-3 space-y-1">
                    <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                      <div
                        className={`h-full bg-[var(--color-accent)] transition-all duration-500 ${order.status === 'confirmed' ? 'w-full' : 'w-1/3'}`}
                      />
                    </div>
                    <p className="text-[10px] text-[var(--color-neutral)]">
                      {order.status === 'confirmed'
                        ? 'Order processed & ready to ship'
                        : 'Awaiting admin review'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
