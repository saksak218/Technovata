"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroVisual() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || failed) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let visible = false;
    let disposed = false;
    function syncPlayback() {
      if (!video) return;
      const shouldPlay =
        visible &&
        !document.hidden &&
        !paused &&
        !reducedMotion.matches &&
        (desktop.matches || manuallyStarted);
      if (shouldPlay) {
        const source =
          resolvedTheme === "dark"
            ? "/brand/emblem-motion.mp4"
            : "/brand/emblem-motion-light.mp4";
        if (video.getAttribute("src") !== source) {
          setVideoReady(false);
          video.src = source;
        }
        void video
          .play()
          .then(() => {
            if (disposed || document.hidden || !visible) video.pause();
          })
          .catch(() => {
            // Autoplay may be blocked; the branded static artwork stays visible.
          });
      } else {
        video.pause();
        if (reducedMotion.matches && video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
          setVideoReady(false);
        }
      }
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
      disposed = true;
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      desktop.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [paused, manuallyStarted, failed, resolvedTheme]);

  return (
    <div
      className="hero-visual"
      ref={containerRef}
      data-playing={playing}
      data-video-ready={videoReady}
    >
      <div className="hero-stage-heading" aria-hidden="true">
        <span>
          <span className="status-dot" /> THE TECHNOVATA DIMENSION
        </span>
        <span>01 / IN MOTION</span>
      </div>
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-artwork" aria-hidden="true">
        <Image
          src="/brand/emblem.png"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 767px) 92vw, 48vw"
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
          onPlaying={() => {
            setPlaying(true);
            setVideoReady(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setVideoReady(false);
            setFailed(true);
          }}
        />
      </div>
      <div className="visual-caption" aria-hidden="true">
        <span className="status-dot" />
        <span>IDEAS. ENGINEERED.</span>
        <span className="caption-line" />
      </div>
      {!failed && (
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
      )}
    </div>
  );
}
