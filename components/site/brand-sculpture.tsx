"use client";

import { useMemo, type RefObject } from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import { CurvePath, LineCurve3, Shape, Vector3, type Group } from "three";

function Sculpture({
  groupRef,
  compact,
}: {
  groupRef: RefObject<Group | null>;
  compact: boolean;
}) {
  const { plate, letter, circuits } = useMemo(() => {
    const plate = new Shape();
    plate.moveTo(-0.95, -1.2);
    plate.lineTo(0.95, -1.2);
    plate.quadraticCurveTo(1.12, -1.2, 1.12, -1.03);
    plate.lineTo(1.12, 1.03);
    plate.quadraticCurveTo(1.12, 1.2, 0.95, 1.2);
    plate.lineTo(-0.95, 1.2);
    plate.quadraticCurveTo(-1.12, 1.2, -1.12, 1.03);
    plate.lineTo(-1.12, -1.03);
    plate.quadraticCurveTo(-1.12, -1.2, -0.95, -1.2);
    const letter = new Shape();
    letter.moveTo(-0.83, 0.84);
    letter.lineTo(0.95, 0.84);
    letter.lineTo(0.64, 0.38);
    letter.lineTo(0.27, 0.38);
    letter.lineTo(0.27, -0.86);
    letter.lineTo(-0.22, -1);
    letter.lineTo(-0.22, 0.38);
    letter.lineTo(-1.13, 0.38);
    letter.closePath();
    const circuits = [
      [
        [-0.23, 0.1, 0.31],
        [0.12, 0.45, 0.31],
        [0.36, 0.45, 0.31],
        [0.57, 0.66, 0.31],
      ],
      [
        [-0.02, -0.76, 0.31],
        [-0.02, -0.2, 0.31],
        [0.38, 0.2, 0.31],
      ],
    ].map((points) => {
      const path = new CurvePath<Vector3>();
      for (let i = 1; i < points.length; i++)
        path.add(
          new LineCurve3(
            new Vector3(...points[i - 1]),
            new Vector3(...points[i]),
          ),
        );
      return path;
    });
    return { plate, letter, circuits };
  }, []);
  const segments = compact ? 64 : 112;
  return (
    <group ref={groupRef} rotation={[0.12, -0.35, -0.08]}>
      <mesh position={[0, 0, -0.17]}>
        <extrudeGeometry
          args={[
            plate,
            {
              depth: 0.16,
              bevelEnabled: true,
              bevelSize: 0.08,
              bevelThickness: 0.08,
              bevelSegments: 3,
              steps: 1,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#61dfc5"
          metalness={0.22}
          roughness={0.16}
          transparent
          opacity={0.26}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <extrudeGeometry
          args={[
            letter,
            {
              depth: 0.12,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.025,
              bevelSegments: 2,
              steps: 1,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#073545"
          metalness={0.45}
          roughness={0.25}
          clearcoat={1}
        />
      </mesh>
      {circuits.map((path, index) => (
        <group key={index}>
          <mesh>
            <tubeGeometry args={[path, 12, 0.018, 6, false]} />
            <meshStandardMaterial
              color="#e4fff7"
              emissive="#b7ffe7"
              emissiveIntensity={0.6}
            />
          </mesh>
          <mesh position={index === 0 ? [0.57, 0.66, 0.31] : [0.38, 0.2, 0.31]}>
            <torusGeometry args={[0.063, 0.018, 8, 20]} />
            <meshStandardMaterial
              color="#e4fff7"
              emissive="#b7ffe7"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}
      {(
        [
          {
            rotation: [1.13, 0.2, -0.48],
            radius: 1.72,
            width: 0.22,
            color: "#a9c9db",
            emissive: "#28484f",
          },
          {
            rotation: [-0.68, 0.44, 0.55],
            radius: 1.91,
            width: 0.17,
            color: "#a99bdf",
            emissive: "#443260",
          },
          {
            rotation: [0.35, 1.05, 0.8],
            radius: 1.57,
            width: 0.12,
            color: "#42dbc1",
            emissive: "#0d7665",
          },
        ] as const
      ).map((ribbon, index) => (
        <group rotation={[...ribbon.rotation]} key={index}>
          <mesh>
            <cylinderGeometry
              args={[
                ribbon.radius,
                ribbon.radius,
                ribbon.width,
                segments,
                1,
                true,
              ]}
            />
            <meshPhysicalMaterial
              color={ribbon.color}
              emissive={ribbon.emissive}
              emissiveIntensity={0.16}
              metalness={0.55}
              roughness={0.19}
              clearcoat={1}
              side={2}
            />
          </mesh>
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[0, (side * ribbon.width) / 2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[ribbon.radius, 0.012, 6, segments]} />
              <meshStandardMaterial
                color={index === 1 ? "#d6cbff" : "#b0ffee"}
                emissive={index === 1 ? "#6d59c0" : "#24b39a"}
                emissiveIntensity={0.3}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}
      {(
        [
          [-1.65, 0.5, 0.4],
          [1.5, -0.9, 0.6],
          [0.6, 1.7, -0.6],
        ] as const
      ).map((position, index) => (
        <mesh key={index} position={[...position]}>
          <sphereGeometry args={[index === 0 ? 0.075 : 0.045, 12, 12]} />
          <meshBasicMaterial color={index === 1 ? "#b5a0ff" : "#76ffdb"} />
        </mesh>
      ))}
    </group>
  );
}

export function BrandSculpture({
  active,
  compact,
  groupRef,
  onCreated,
}: {
  active: boolean;
  compact: boolean;
  groupRef: RefObject<Group | null>;
  onCreated: (state: RootState) => void;
}) {
  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={compact ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: "low-power" }}
      onCreated={onCreated}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 4]} intensity={4} color="#e6fff8" />
      <directionalLight position={[-4, 1, 3]} intensity={3} color="#b5a4ff" />
      <directionalLight position={[1, -4, 3]} intensity={2} color="#52efcd" />
      <pointLight position={[0, 2, -2]} intensity={6} color="#2ce7bc" />
      <Sculpture groupRef={groupRef} compact={compact} />
    </Canvas>
  );
}
