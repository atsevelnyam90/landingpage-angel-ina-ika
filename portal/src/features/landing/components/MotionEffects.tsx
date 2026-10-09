"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let lenis: Lenis | undefined;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-title, .services-one__single, .film-card, .benefit-grid article, .customer-event-image, .contact-grid > div, .contact-grid address",
      ),
    );
    const setup = () => {
      observer?.disconnect();
      lenis?.destroy();
      for (const element of elements) element.classList.remove("motion-ready", "motion-visible");
      if (preference.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.3,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        prevent: (element) => Boolean(element.closest("dialog")),
      });
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("motion-visible");
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
      );
      for (const element of elements) {
        element.classList.add("motion-ready");
        const siblings = element.parentElement?.children;
        const index = siblings ? Array.from(siblings).indexOf(element) : 0;
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
        observer.observe(element);
      }
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      lenis?.destroy();
      preference.removeEventListener("change", setup);
      for (const element of elements) element.classList.remove("motion-ready", "motion-visible");
    };
  }, []);
  return null;
}
