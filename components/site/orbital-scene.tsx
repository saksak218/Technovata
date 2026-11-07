"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { RootState } from "@react-three/fiber";
import type { Group } from "three";
import { cn } from "@/lib/utils";

const BrandSculpture = dynamic(
  () =>
    import("@/components/site/brand-sculpture").then(
      (module) => module.BrandSculpture,
    ),
  { ssr: false },
);

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function OrbitalArtwork() {
  return (
    <div className="orbital-fallback">
      <Image
        src="/brand/emblem.png"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 767px) 85vw, 45vw"
        className="orbital-fallback-image"
      />
    </div>
  );
}

export function OrbitalScene({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const group = useRef<Group>(null);
  const root = useRef<RootState | null>(null);
  const frame = useRef(0);
  const activeRef = useRef(false);
  const contextCleanup = useRef<() => void>(() => {});
  const scrollOffset = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [compact, setCompact] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const fail = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setFailed(true);
  }, []);

  const turn = useCallback(
    (x: number, y: number, z: number, duration = 250) => {
      cancelAnimationFrame(frame.current);
      const object = group.current;
      if (!object || !activeRef.current) return;
      const start = performance.now();
      const from = [object.rotation.x, object.rotation.y, object.rotation.z];
      function tick(now: number) {
        if (!object || !activeRef.current) return;
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        object.rotation.set(
          from[0] + (x - from[0]) * ease,
          from[1] + (y - from[1]) * ease,
          from[2] + (z - from[2]) * ease,
        );
        root.current?.invalidate();
        if (progress < 1) frame.current = requestAnimationFrame(tick);
      }
      frame.current = requestAnimationFrame(tick);
    },
    [],
  );

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    let visible = false;
    let entered = false;
    function sync() {
      activeRef.current = visible && !document.hidden && !motion.matches;
      setActive(activeRef.current);
      setEnabled(entered && !motion.matches);
      setCompact(small.matches);
      if (motion.matches) {
        // Fiber intentionally releases its context on unmount; this is not a GPU failure.
        contextCleanup.current();
        contextCleanup.current = () => {};
        root.current = null;
        setReady(false);
      }
      if (!activeRef.current) cancelAnimationFrame(frame.current);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) entered = true;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(frame.current);
      contextCleanup.current();
    };
  }, []);

  useEffect(() => {
    if (!active || !ready) return;
    function scroll() {
      const element = container.current;
      if (!element || !group.current || !activeRef.current) return;
      const bounds = element.getBoundingClientRect();
      scrollOffset.current =
        ((bounds.top + bounds.height / 2) / window.innerHeight - 0.5) * 0.24;
      group.current.position.y = -scrollOffset.current * 0.6;
      group.current.rotation.z = -0.12 + scrollOffset.current;
      root.current?.invalidate();
    }
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, [active, ready]);

  function move(event: ReactPointerEvent<HTMLDivElement>) {
    if (!ready || !activeRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    turn(
      0.15 + y * 0.5,
      -0.3 + x * 0.9,
      -0.12 + x * 0.12 + scrollOffset.current,
    );
  }

  return (
    <div
      ref={container}
      className={cn("orbital-scene", className)}
      data-scene-state={
        failed ? "fallback" : ready && enabled ? "ready" : "static"
      }
      onPointerMove={move}
      onPointerLeave={() => turn(0.15, -0.3, -0.12 + scrollOffset.current, 500)}
      aria-hidden="true"
    >
      <div className="orbital-ground" />
      <OrbitalArtwork />
      {enabled && !failed && (
        <SceneBoundary onError={fail}>
          <div className="orbital-canvas">
            <BrandSculpture
              active={active}
              compact={compact}
              groupRef={group}
              onCreated={(state) => {
                root.current = state;
                const canvas = state.gl.domElement;
                function lost(event: Event) {
                  event.preventDefault();
                  fail();
                }
                contextCleanup.current();
                canvas.addEventListener("webglcontextlost", lost);
                contextCleanup.current = () =>
                  canvas.removeEventListener("webglcontextlost", lost);
                setReady(true);
                turn(0.15, -0.3, -0.12, 1200);
              }}
            />
          </div>
        </SceneBoundary>
      )}
      <span className="orbital-hint">
        <span className="orbital-hint-dot" />
        {ready && enabled && !failed
          ? "LIVE 3D / MOVE TO EXPLORE"
          : "CONNECTED BY DESIGN"}
      </span>
    </div>
  );
}
