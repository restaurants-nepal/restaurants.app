import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Floating Plate ───
function Plate({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <group>
        <mesh ref={ref} position={position} castShadow>
          <torusGeometry args={[1, 0.18, 12, 48]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Inner plate surface */}
        <mesh position={[position[0], position[1] - 0.05, position[2]]}>
          <cylinderGeometry args={[0.82, 0.82, 0.06, 32]} />
          <meshStandardMaterial color="#fffef9" roughness={0.15} metalness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Fork / Knife ───
function Utensil({
  position,
  rotationZ = 0,
  color = "#c0c0c0",
}: {
  position: [number, number, number];
  rotationZ?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.z =
      rotationZ + Math.sin(clock.getElapsedTime() * 0.7) * 0.15;
    ref.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * 0.9) * 0.15;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={ref} position={position}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.08, 1, 0.03]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.02]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Wine Glass ───
function WineGlass({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    ref.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * 0.6) * 0.2;
  });
  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.2}>
      <group ref={ref} position={position}>
        {/* Base */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.05}
            metalness={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Stem */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.05}
            metalness={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Bowl */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#e8dfd4"
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Wine liquid */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.28, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#8b1a32" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Donut ───
function Donut({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.5;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
  });
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={2}>
      <group>
        <mesh ref={ref} position={position} castShadow>
          <torusGeometry args={[0.35, 0.18, 12, 24]} />
          <meshStandardMaterial color="#e8943a" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Icing */}
        <mesh position={[position[0], position[1] + 0.08, position[2]]}>
          <torusGeometry args={[0.35, 0.15, 12, 24]} />
          <meshStandardMaterial color="#e84393" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Pizza Slice ───
function PizzaSlice({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.35;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(-0.5, 1.2);
    s.quadraticCurveTo(0, 1.4, 0.5, 1.2);
    s.lineTo(0, 0);
    return s;
  }, []);

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.8}>
      <mesh ref={ref} position={position} castShadow>
        <extrudeGeometry
          args={[shape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1 }]}
        />
        <meshStandardMaterial color="#f0c040" roughness={0.5} metalness={0.05} />
      </mesh>
    </Float>
  );
}

// ─── Ambient Particles (lightweight) ───
function Particles({ count = 50 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.03,
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 0.5,
        p.position[1] + Math.cos(time * p.speed * 0.8 + p.offset) * 0.5,
        p.position[2] + Math.sin(time * p.speed * 0.6 + p.offset) * 0.3
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#ffd6a5"
        emissive="#ff9f43"
        emissiveIntensity={0.5}
        transparent
        opacity={0.45}
      />
    </instancedMesh>
  );
}

// ─── Glowing Orb (simple material, no distortion) ───
function GlowOrb({
  position,
  color,
  size = 0.5,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const s = size + Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
    ref.current.scale.setScalar(s);
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={2}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

// ─── Slow orbit camera movement ───
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() * 0.15;
    camera.position.x = Math.sin(t) * 0.5;
    camera.position.y = Math.cos(t * 0.7) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Main Scene Export ───
export default function RestaurantScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <CameraRig />

        {/* Lighting — minimal setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fff5e6" />
        <pointLight position={[-4, 3, 2]} intensity={0.5} color="#ff9f43" />

        {/* Food Objects — reduced count */}
        <Plate position={[-3.5, 1.5, -2]} />
        <Plate position={[3.8, -1.8, -3]} />
        <Utensil position={[-2.5, 0.8, -1]} rotationZ={0.3} />
        <Utensil position={[2.8, 1.2, -1.5]} rotationZ={-0.2} color="#d4a76a" />
        <WineGlass position={[3.5, 2.2, -2.5]} />
        <Donut position={[-2, -2.2, -1]} />
        <PizzaSlice position={[2.5, -0.5, -1.5]} />

        {/* Glowing Orbs — fewer, simpler */}
        <GlowOrb position={[-4, 0, -4]} color="#ff6b6b" size={0.8} />
        <GlowOrb position={[4, 2, -5]} color="#feca57" size={0.6} />
        <GlowOrb position={[0, -3, -6]} color="#ff9ff3" size={0.7} />

        {/* Particles — reduced */}
        <Particles count={50} />
      </Canvas>
    </div>
  );
}
