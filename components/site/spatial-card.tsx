"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpatialCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = card.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    function reset() {
      element!.style.removeProperty("--tilt-x");
      element!.style.removeProperty("--tilt-y");
      element!.style.removeProperty("--light-x");
      element!.style.removeProperty("--light-y");
      element!.removeAttribute("data-tilting");
    }
    function move(event: PointerEvent) {
      if (motion.matches || !pointer.matches || event.pointerType === "touch") {
        reset();
        return;
      }
      const bounds = element!.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      element!.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
      element!.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
      element!.style.setProperty("--light-x", `${x * 100}%`);
      element!.style.setProperty("--light-y", `${y * 100}%`);
      element!.setAttribute("data-tilting", "true");
    }
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div className={cn("spatial-card", className)} ref={card}>
      {children}
    </div>
  );
}
