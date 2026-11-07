"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function HeroVisual() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let visible = false;
    function syncPlayback() {
      if (!video) return;
      const shouldPlay =
        resolvedTheme === "dark" &&
        visible &&
        !document.hidden &&
        !paused &&
        !reducedMotion.matches &&
        (desktop.matches || manuallyStarted);
      if (shouldPlay) {
        if (!video.getAttribute("src")) video.src = "/brand/emblem-motion.mp4";
        void video.play().catch(() => {
          /* Autoplay can be blocked; the static artwork stays visible. */
        });
      } else video.pause();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 },
    );
    observer.observe(container);
    reducedMotion.addEventListener("change", syncPlayback);
    desktop.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      desktop.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [paused, manuallyStarted, resolvedTheme]);

  return (
    <div className="hero-visual" ref={containerRef} data-playing={playing}>
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-artwork" aria-hidden="true">
        <Image
          src="/brand/emblem.png"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 767px) 92vw, 55vw"
          preload
          className="emblem-still"
        />
        <video
          ref={videoRef}
          className="emblem-video"
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      </div>
      <div className="visual-caption">
        <span className="status-dot" />
        <span>IDEAS. ENGINEERED.</span>
        <span className="caption-line" />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="animation-toggle"
        aria-label={
          playing ? "Pause emblem animation" : "Play emblem animation"
        }
        onClick={() => {
          setManuallyStarted(true);
          setPaused(playing);
        }}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </Button>
    </div>
  );
}
