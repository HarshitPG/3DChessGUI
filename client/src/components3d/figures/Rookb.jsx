/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 public/models/rookb.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rook({ position, color, selected }) {
  const { nodes, materials } = useGLTF("models/kingb.glb");
  return (
    <group
      // position={[position.x / 64, 0.45 / 64, position.y / 64]}
      position-y={0.45 / 64}
      scale={[0.3, 0.3, 0.3]}
    >
      <mesh
        geometry={nodes.Black_rook.geometry}
        material={materials["Material.001"]}
      >
        {selected && <meshStandardMaterial color="green" />}
      </mesh>
    </group>
  );
}

useGLTF.preload("models/kingb.glb");
