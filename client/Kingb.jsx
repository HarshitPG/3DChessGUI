/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/kingb.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/kingb.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.A001.geometry} material={materials['Material.001']} position={[8.588, 2.017, 6.256]} />
      <mesh geometry={nodes.B001.geometry} material={materials['Material.001']} position={[6.066, 2.017, 6.256]} />
      <mesh geometry={nodes.C001.geometry} material={materials['Material.001']} position={[3.718, 2.017, 6.256]} />
      <mesh geometry={nodes.D001.geometry} material={materials['Material.001']} position={[1.09, 2.017, 6.256]} />
      <mesh geometry={nodes.E001.geometry} material={materials['Material.001']} position={[-1.276, 2.017, 6.256]} />
      <mesh geometry={nodes.F001.geometry} material={materials['Material.001']} position={[-3.683, 2.017, 6.256]} />
      <mesh geometry={nodes.G001.geometry} material={materials['Material.001']} position={[-6.125, 2.017, 6.256]} />
      <mesh geometry={nodes.H001.geometry} material={materials['Material.001']} position={[-8.725, 2.017, 6.256]} />
      <mesh geometry={nodes.A.geometry} material={materials['Material.004']} position={[8.588, 2.017, -6.138]} />
      <mesh geometry={nodes.B.geometry} material={materials['Material.004']} position={[6.066, 2.017, -6.138]} />
      <mesh geometry={nodes.C.geometry} material={materials['Material.004']} position={[3.718, 2.017, -6.138]} />
      <mesh geometry={nodes.D.geometry} material={materials['Material.004']} position={[1.09, 2.017, -6.138]} />
      <mesh geometry={nodes.E.geometry} material={materials['Material.004']} position={[-1.276, 2.017, -6.138]} />
      <mesh geometry={nodes.F.geometry} material={materials['Material.004']} position={[-3.683, 2.017, -6.138]} />
      <mesh geometry={nodes.G.geometry} material={materials['Material.004']} position={[-6.125, 2.017, -6.138]} />
      <mesh geometry={nodes.H.geometry} material={materials['Material.004']} position={[-8.725, 2.017, -6.138]} />
      <mesh geometry={nodes.White_rook.geometry} material={materials['Material.003']} position={[8.731, 2.028, -8.743]} />
      <mesh geometry={nodes.White_rook001.geometry} material={materials['Material.003']} position={[-8.607, 2.028, -8.743]} />
      <mesh geometry={nodes.Black_rook001.geometry} material={materials['Material.001']} position={[-8.607, 2.028, 8.677]} />
      <mesh geometry={nodes.Black_rook.geometry} material={materials['Material.001']} position={[8.486, 2.028, 8.677]} />
      <mesh geometry={nodes.Black_knight001.geometry} material={materials['Material.001']} position={[6.139, 2.323, 8.722]} />
      <mesh geometry={nodes.Black_knight.geometry} material={materials['Material.001']} position={[-6.171, 2.323, 8.732]} />
      <mesh geometry={nodes.White_knight.geometry} material={materials['Material.003']} position={[-6.167, 2.323, -8.623]} />
      <mesh geometry={nodes.White_knight001.geometry} material={materials['Material.003']} position={[6.058, 2.323, -8.563]} />
      <mesh geometry={nodes.White_king.geometry} material={materials['Material.004']} position={[-1.309, 2.885, -8.58]} />
      <mesh geometry={nodes.Black_king.geometry} material={materials['Material.001']} position={[-1.284, 2.885, 8.545]} />
      <mesh geometry={nodes.Black_bitshop.geometry} material={materials['Material.001']} position={[-3.712, 2.498, 8.51]} />
      <mesh geometry={nodes.Black_bitshop001.geometry} material={materials['Material.001']} position={[3.573, 2.498, 8.51]} />
      <mesh geometry={nodes.White_bitshop.geometry} material={materials['Material.003']} position={[-3.712, 2.498, -8.488]} />
      <mesh geometry={nodes.White_bitshop001.geometry} material={materials['Material.003']} position={[3.573, 2.498, -8.488]} />
      <mesh geometry={nodes.White_queen.geometry} material={materials['Material.004']} position={[1.199, 2.694, -8.418]} />
      <mesh geometry={nodes.Black_queen.geometry} material={materials['Material.001']} position={[1.252, 2.694, 8.746]} />
      <mesh geometry={nodes.Plane.geometry} material={materials.Material} />
      <mesh geometry={nodes.Plane_1.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.Plane_2.geometry} material={materials['Material.005']} />
    </group>
  )
}

useGLTF.preload('/kingb.glb')
