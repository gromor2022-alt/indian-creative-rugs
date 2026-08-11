"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export default function LenisProvider({
  children,
}: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}