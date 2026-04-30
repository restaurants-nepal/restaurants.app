import { useEffect, useRef, type MutableRefObject } from "react";

type MouseRef = MutableRefObject<{ x: number; y: number; px: number; py: number }>;

/* ═══════════════════════════════════════════════════
 * Vector Icons
 * ═══════════════════════════════════════════════════ */
const FireVector = () => (
  <svg width="90" height="90" viewBox="0 0 24 24">
    <path fill="#FF5722" d="M17.65 11.45c-1.15-2-2.92-3.32-4-5.38-1.57-3-1-5.6-.96-5.83.02-.13-.08-.24-.2-.24-.1 0-.19.06-.23.15-1.19 3.01-4 3.73-4.99 5.53-1.33 2.45-1.14 5.37.5 7.63.1.14.07.33-.06.44-.13.11-.32.11-.45.01-.29-.21-.55-.45-.78-.71-1.37-1.46-2.19-3.23-2.13-4.8.03-.23-.27-.37-.51-.23-.1.06-.15.17-.13.27C4 11.23 4.29 14.02 5.53 16c1.69 2.7 4.54 4.09 7.69 4 3.44-.1 6.53-2.58 7.37-5.91.43-1.74.05-3.61-1.04-5.22-.09-.13-.27-.13-.37 0-.41.52-.94 1-1.53 1.48z" />
    <path fill="#FFC107" d="M13.4 18.06c-1.55.93-3.05.5-3.95-.59-.72-.88-.73-2.02-.12-2.98.53-.83 1.25-1.37 1.83-2.22.47-.73.81-1.57.81-2.45 0-.09.11-.14.18-.08 1.15 1.05 3.32 3.03 2.5 5.51-.19.6.14.3.43-.09 1-1.3 1-3.64 1-3.64.01-.13.19-.15.24-.04.41 1.05.65 2.19.49 3.35-.29 2.12-1.87 3.65-3.41 3.23z" />
  </svg>
);

const CoffeeVector = () => (
  <svg width="100" height="100" viewBox="0 0 24 24">
    {/* Vapour Lines */}
    <path fill="none" stroke="#faedcd" strokeWidth="1.2" strokeLinecap="round" d="M8 7 C 8 3, 10 4, 10 1" opacity="0.7">
      <animate attributeName="d" values="M8 7 C 8 3, 10 4, 10 1; M8 7 C 7 3, 11 4, 10 1; M8 7 C 8 3, 10 4, 10 1" dur="3s" repeatCount="indefinite" />
    </path>
    <path fill="none" stroke="#faedcd" strokeWidth="1.2" strokeLinecap="round" d="M12 8 C 11 4, 13 3, 12 0" opacity="0.7">
      <animate attributeName="d" values="M12 8 C 11 4, 13 3, 12 0; M12 8 C 13 4, 11 3, 12 0; M12 8 C 11 4, 13 3, 12 0" dur="4s" repeatCount="indefinite" />
    </path>
    <path fill="none" stroke="#faedcd" strokeWidth="1.2" strokeLinecap="round" d="M16 7 C 17 3, 15 4, 15 1" opacity="0.7">
      <animate attributeName="d" values="M16 7 C 17 3, 15 4, 15 1; M16 7 C 15 3, 16 4, 15 1; M16 7 C 17 3, 15 4, 15 1" dur="3.5s" repeatCount="indefinite" />
    </path>
    {/* Mug shifted down slightly */}
    <g transform="translate(0, 3) scale(0.9) transform-origin(center)">
      <path fill="#d4a373" d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z" />
      <path fill="#faedcd" d="M4 19h16v2H4z" />
    </g>
  </svg>
);

const SekuaVector = () => (
  <svg width="130" height="130" viewBox="0 0 24 24" transform="rotate(-40)">
    <rect x="11.5" y="2" width="1.5" height="20" rx="0.5" fill="#FFE0B2" />
    <rect x="7.5" y="5" width="9" height="5" rx="1.5" fill="#a0522d" />
    <rect x="8" y="11" width="8" height="4.5" rx="1" fill="#8b4513" />
    <rect x="7.5" y="16.5" width="9" height="4.5" rx="1.5" fill="#a0522d" />
  </svg>
);

/* ═══════════════════════════════════════════════════
 * Floating Parallax Container
 * ═══════════════════════════════════════════════════ */
interface ParallaxItemProps {
  mouseRef: MouseRef;
  children: React.ReactNode;
  parallaxFactor: number;
  floatSpeed: number;
  floatOffset: number;
  startPos: { top: string; left: string };
  glowColor: string;
  scale?: number;
}

function ParallaxItem({
  mouseRef,
  children,
  parallaxFactor,
  floatSpeed,
  floatOffset,
  startPos,
  glowColor,
  scale = 1,
}: ParallaxItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let time = 0;
    let currentX = 0;
    let currentY = 0;
    let dodgeX = 0;
    let dodgeY = 0;

    const animate = () => {
      time += 0.01;

      // Mouse Parallax
      const targetX = mouseRef.current.x * parallaxFactor;
      const targetY = -mouseRef.current.y * parallaxFactor;

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Float
      const floatX = Math.cos(time * floatSpeed * 0.8 + floatOffset) * 12;
      const floatY = Math.sin(time * floatSpeed + floatOffset) * 16;
      const rot = Math.sin(time * floatSpeed * 0.5 + floatOffset) * 4;

      // Dodge interaction (Repel the mouse)
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate "resting" physical position by untangling the current dodge offset
        // This ensures the element doesn't jitter rapidly in a feedback loop
        const effectiveX = centerX - dodgeX;
        const effectiveY = centerY - dodgeY;

        const dx = effectiveX - mouseRef.current.px;
        const dy = effectiveY - mouseRef.current.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const threshold = 180; // Distance in pixels to start dodging
        if (dist < threshold && dist > 0) {
          const force = (threshold - dist) / threshold; // Scale 0 to 1
          const targetDodgeX = (dx / dist) * force * 150; // max push 150px
          const targetDodgeY = (dy / dist) * force * 150;
          dodgeX += (targetDodgeX - dodgeX) * 0.15;
          dodgeY += (targetDodgeY - dodgeY) * 0.15;
        } else {
          dodgeX += (0 - dodgeX) * 0.05; // slowly return to resting position
          dodgeY += (0 - dodgeY) * 0.05;
        }

        ref.current.style.transform = `translate(${currentX + floatX + dodgeX}px, ${currentY + floatY + dodgeY}px) rotate(${rot}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [mouseRef, parallaxFactor, floatSpeed, floatOffset, scale]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        ...startPos,
        opacity: 0.35,
        filter: `drop-shadow(0 15px 25px ${glowColor}) blur(2px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
 * 2D Canvas Background Dots
 * ═══════════════════════════════════════════════════ */
function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  mouseRef: MouseRef,
  count = 60
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      mouseFactor: 0.2 + Math.random() * 0.6,
      alpha: 0.15 + Math.random() * 0.4,
      hue: 20 + Math.random() * 30,
    }));

    let raf: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x; 
      const my = mouseRef.current.y; 

      particles.forEach((p) => {
        const driftX = Math.sin(time * p.speed + p.offset) * 20;
        const driftY = Math.cos(time * p.speed * 0.8 + p.offset) * 20;
        const mouseOffsetX = mx * p.mouseFactor * 45;
        const mouseOffsetY = -my * p.mouseFactor * 45;

        p.x += (p.baseX + driftX + mouseOffsetX - p.x) * 0.04;
        p.y += (p.baseY + driftY + mouseOffsetY - p.y) * 0.04;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha * 0.15})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, mouseRef, count]);
}

/* ═══════════════════════════════════════════════════
 * Floating Element Data Configuration
 * ═══════════════════════════════════════════════════ */
const floatingConfig = [
  // Fires
  { id: 1, type: "fire", top: "15%", left: "12%", factor: 50, speed: 2.1, offset: 0, scale: 0.85 },
  { id: 2, type: "fire", top: "70%", left: "82%", factor: 35, speed: 1.6, offset: 1.5, scale: 0.65 },
  { id: 3, type: "fire", top: "85%", left: "28%", factor: 75, speed: 2.8, offset: 3, scale: 1.15 },
  { id: 4, type: "fire", top: "45%", left: "92%", factor: 85, speed: 2.3, offset: 4.5, scale: 1 },

  // Coffees
  { id: 5, type: "coffee", top: "12%", left: "80%", factor: 45, speed: 1.9, offset: 2, scale: 0.95 },
  { id: 6, type: "coffee", top: "62%", left: "18%", factor: 65, speed: 2.6, offset: 0.5, scale: 1.05 },
  { id: 7, type: "coffee", top: "35%", left: "8%", factor: 25, speed: 1.3, offset: 5, scale: 0.75 },
  { id: 8, type: "coffee", top: "82%", left: "62%", factor: 55, speed: 2.2, offset: 3.5, scale: 1.25 },

  // Sekuas
  { id: 9, type: "sekua", top: "28%", left: "68%", factor: 70, speed: 1.5, offset: 4, scale: 1.1 },
  { id: 10, type: "sekua", top: "75%", left: "42%", factor: 40, speed: 1.8, offset: 1, scale: 0.8 },
  { id: 11, type: "sekua", top: "18%", left: "40%", factor: 60, speed: 2.7, offset: 6, scale: 0.9 },
  { id: 12, type: "sekua", top: "55%", left: "80%", factor: 50, speed: 2.0, offset: 2.5, scale: 1.0 },
];

/* ═══════════════════════════════════════════════════
 * Main Scene Container
 * ═══════════════════════════════════════════════════ */
interface RestaurantSceneProps {
  mouseRef: MouseRef;
}

export default function RestaurantScene({ mouseRef }: RestaurantSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticles(canvasRef, mouseRef, 80);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%" }}>
        {floatingConfig.map((item) => (
          <ParallaxItem
            key={item.id}
            mouseRef={mouseRef}
            parallaxFactor={item.factor}
            floatSpeed={item.speed}
            floatOffset={item.offset}
            scale={item.scale}
            startPos={{ top: item.top, left: item.left }}
            glowColor={
              item.type === "fire"
                ? "rgba(255, 87, 34, 0.4)"
                : item.type === "coffee"
                ? "rgba(212, 163, 115, 0.4)"
                : "rgba(160, 82, 45, 0.4)"
            }
          >
            {item.type === "fire" ? (
              <FireVector />
            ) : item.type === "coffee" ? (
              <CoffeeVector />
            ) : (
              <SekuaVector />
            )}
          </ParallaxItem>
        ))}
      </div>
    </div>
  );
}
