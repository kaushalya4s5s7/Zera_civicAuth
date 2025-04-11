"use client";

import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot_playground.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  );
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    if (actions && actions["Experiment"]) {
      actions["Experiment"].play().paused = true;
    }
  }, [actions]);

  useFrame(() => {
    if (actions && actions["Experiment"]) {
      actions["Experiment"].time =
        (actions["Experiment"].getClip().duration * scroll.offset) / 4;
    }
  });

  return (
    <group ref={group} scale={[3.5, 3.5, 3.5]}>
      <primitive object={scene} />
    </group>
  );
}
