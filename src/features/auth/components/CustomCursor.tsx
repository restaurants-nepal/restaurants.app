import { useEffect, useRef } from "react";

interface CustomCursorProps {
  isInsideModal: boolean;
}

export default function CustomCursor({ isInsideModal }: CustomCursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      // Smooth lerp for the ring (trails the mouse)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 22}px, ${ringPos.current.y - 22}px)`;
      }
      // Dot follows mouse instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring — trails with lerp */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.45)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isInsideModal ? 0 : 1,
          transition: "opacity 0.35s ease, width 0.3s ease, height 0.3s ease",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Inner dot — follows exactly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isInsideModal ? 0 : 1,
          transition: "opacity 0.35s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
