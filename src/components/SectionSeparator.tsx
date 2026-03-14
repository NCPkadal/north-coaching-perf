"use client";

import Image from "next/image";

export function SectionSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={"relative -mt-10 h-20 w-full overflow-hidden " + className} aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/brand/section-separator.svg"
          alt=""
          width={1200}
          height={140}
          className="w-[min(1200px,95vw)] opacity-70"
          priority={false}
        />
      </div>
    </div>
  );
}
