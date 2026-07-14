'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 🎯 রুট ট্র্যাক করার জন্য ইম্পোর্ট করলাম
import Lenis from 'lenis';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 🎯 বর্তমান পেজের পাথ

  useEffect(() => {
    // Lenis কনফিগারেশন
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // পেজ চেঞ্জ হওয়ার সাথে সাথে স্ক্রল পজিশন টপে নিয়ে যাওয়া এবং হাইট রিসাইজ করা
    lenis.resize();
    window.scrollTo(0, 0);

    // ক্লিনআপ ফাংশন: পুরনো পেজের ক্যাশ ডেস্ট্রয় করবে
    return () => {
      lenis.destroy();
    };
  }, [pathname]); // 🎯 এখানে pathname দেওয়ার কারণে প্রতি পেজ চেঞ্জে Lenis নতুন করে রি-স্টার্ট হবে

  return <>{children}</>;
}
