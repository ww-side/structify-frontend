'use client';

import { cn } from "@/shared/lib/utils";

export function ViewWidgetLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("p-3 bg-secondary rounded-xl text-primary-text border hover:border-primary cursor-pointer transition duration-300 ease-in-out min-w-52", className)}>
      {children}
    </section>
  );
}
