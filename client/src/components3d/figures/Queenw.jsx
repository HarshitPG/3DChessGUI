/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 public/models/queenb.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function QueenW({ position, color, selected }) {
  const { nodes, materials } = useGLTF("models/kingb.glb");
  return (
    <group
      // position={[position.x / 64, 0.2, position.y / 64]}
      scale={[0.3, 0.3, 0.3]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.White_queen.geometry}
        material={materials["Material.003"]}
      >
        {selected && <meshStandardMaterial color="green" />}
      </mesh>
    </group>
  );
}

useGLTF.preload("models/kingb.glb");