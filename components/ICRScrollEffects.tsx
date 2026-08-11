"use client";

import { useEffect } from "react";

export default function ICRScrollEffects() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".icr-collection-card"));

    if (!("IntersectionObserver" in window) || cards.length === 0) {
      cards.forEach((card) => card.classList.add("icr-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("icr-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return null;
}
