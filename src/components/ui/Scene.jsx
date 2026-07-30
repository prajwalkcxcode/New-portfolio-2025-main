import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial, Environment } from '@react-three/drei'

function AnimatedShape() {
  const meshRef = useRef(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Base idle rotation
      const idleRotY = t * 0.2
      const idleRotX = t * 0.1
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2

      // Add cursor tracking physics over the idle rotation
      const targetX = state.pointer.x * 0.6
      const targetY = state.pointer.y * 0.6
      
      meshRef.current.rotation.y += (idleRotY + targetX - meshRef.current.rotation.y) * 0.05
      meshRef.current.rotation.x += (idleRotX - targetY - meshRef.current.rotation.x) * 0.05
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1, 0]} scale={1.8}>
      <MeshDistortMaterial
        color="#a1a1aa" // muted foreground sync
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </Icosahedron>
  )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
