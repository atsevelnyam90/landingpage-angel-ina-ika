"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Hero } from "./Hero";

export function LandingExperience({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!entered) return;
    const header = content.current?.querySelector("header");
    if (!header) return;
    const measure = () =>
      document.documentElement.style.setProperty(
        "--navigation-height",
        `${header.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(header);
    content.current?.querySelector("main")?.focus({ preventScroll: true });
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--navigation-height");
    };
  }, [entered]);
  return entered ? (
    <div className="landing-content" ref={content}>
      {children}
    </div>
  ) : (
    <Hero onEnter={() => setEntered(true)} />
  );
}
