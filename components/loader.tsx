import { LoaderCircle } from "lucide-react";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <LoaderCircle className="w-10 h-10 text-zinc-200"/>
      </div>
      <p className="text-sm text-zinc-400">
        Typing...
      </p>
    </div>
  );
};