export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
      <div className="aspect-[3/4] bg-[#E8E6E0]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-[#E8E6E0] rounded w-3/4" />
        <div className="h-3 bg-[#E8E6E0] rounded w-full" />
        <div className="h-3 bg-[#E8E6E0] rounded w-2/3" />
        <div className="h-9 bg-[#E8E6E0] rounded-full mt-2" />
      </div>
    </div>
  );
}
