import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const BackgroundAnimation = React.memo(() => {
  const AnimatedShape = () => {
    const mesh = useRef<Mesh>(null);
    const position = [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ];
    const type = ["sphere", "box", "cone"][Math.floor(Math.random() * 3)];

    useFrame(() => {
      if (mesh.current) {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
      }
    });

    const geometry =
      type === "sphere" ? (
        <sphereGeometry args={[0.3, 16, 16]} />
      ) : type === "box" ? (
        <boxGeometry args={[0.4, 0.4, 0.4]} />
      ) : (
        <coneGeometry args={[0.3, 0.5, 3]} />
      );

    return (
      <mesh ref={mesh} position={position}>
        {geometry}
        <meshStandardMaterial color={`hsl(${Math.random() * 360}, 70%, 50%)`} />
      </mesh>
    );
  };

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {Array.from({ length: 100 }).map((_, i) => (
        <AnimatedShape key={i} />
      ))}
    </Canvas>
  );
});
