export default function PostCardSkeleton() {
  return (
    <div className="w-full space-y-4 px-4 py-4 shadow-lg rounded-2xl animate-pulse">
      <div className="bg-slate-300/60 aspect-video w-full rounded-2xl"></div>
      <div className="space-y-1 h-11">
        <div className="bg-slate-300/60 h-4 w-full rounded-2xl"></div>
        <div className="bg-slate-300/60 h-4 w-3/4 rounded-2xl"></div>
      </div>
      <div className="flex gap-x-2">
        <div className="bg-slate-300/60 h-5 w-12 rounded-full"></div>
        <div className="bg-slate-300/60 h-5 w-12 rounded-full"></div>
        <div className="bg-slate-300/60 h-5 w-12 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="bg-slate-300/60 h-3 w-full rounded-2xl"></div>
        <div className="bg-slate-300/60 h-3 w-full rounded-2xl"></div>
        <div className="bg-slate-300/60 h-3 w-full rounded-2xl"></div>
      </div>
    </div>
  );
}
