'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, useAnimations, Outlines } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

function EdgeParticles({ model }: { model: THREE.Object3D }) {
    const particlesRef = useRef<THREE.Points>(null)
    
    const { positions, edgeCount } = useMemo(() => {
        const allPositions: number[] = []
        let totalEdges = 0
        
        // Recorrer todos los meshes del modelo
        model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                // Crear geometría de bordes
                const edges = new THREE.EdgesGeometry(child.geometry, 15) // threshold angle
                const edgePositions = edges.attributes.position.array
                
                // Obtener la matriz de transformación del mesh
                const matrix = child.matrixWorld
                
                // Distribuir partículas a lo largo de los bordes
                const particlesPerEdge = 2 // Partículas por segmento de borde
                
                for (let i = 0; i < edgePositions.length; i += 6) {
                    // Cada borde tiene 2 vértices (6 valores: x1,y1,z1, x2,y2,z2)
                    const start = new THREE.Vector3(
                        edgePositions[i],
                        edgePositions[i + 1],
                        edgePositions[i + 2]
                    )
                    const end = new THREE.Vector3(
                        edgePositions[i + 3],
                        edgePositions[i + 4],
                        edgePositions[i + 5]
                    )
                    
                    // Aplicar transformación del mesh
                    start.applyMatrix4(matrix)
                    end.applyMatrix4(matrix)
                    
                    // Interpolar partículas a lo largo del borde
                    for (let j = 0; j < particlesPerEdge; j++) {
                        const t = j / particlesPerEdge
                        const pos = new THREE.Vector3().lerpVectors(start, end, t)
                        allPositions.push(pos.x, pos.y, pos.z)
                        totalEdges++
                    }
                }
                
                edges.dispose()
            }
        })
        
        return {
            positions: new Float32Array(allPositions),
            edgeCount: totalEdges
        }
    }, [model])

    // Animar las partículas con un efecto de flujo
    useFrame((state) => {
        if (particlesRef.current) {
            const time = state.clock.elapsedTime
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
            
            // Crear efecto de pulso/brillo en las partículas
            if (particlesRef.current.material instanceof THREE.PointsMaterial) {
                particlesRef.current.material.opacity = 0.4 + Math.sin(time * 2) * 0.3
            }
        }
    })

    if (edgeCount === 0) return null

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={edgeCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00ffff"
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

function Model({ 
    onAnimationsLoaded,
    showOutline,
    showWireframe,
    showParticles
}: { 
    onAnimationsLoaded?: (count: number, names: string[]) => void
    showOutline: boolean
    showWireframe: boolean
    showParticles: boolean
}) {
    const group = useRef(null)
    const gltf = useGLTF('/models/model.glb')
    const { actions, names } = useAnimations(gltf.animations, group)

    // Notify parent about animations
    useEffect(() => {
        if (onAnimationsLoaded) {
            onAnimationsLoaded(gltf.animations?.length || 0, names)
        }
    }, [gltf.animations, names, onAnimationsLoaded])

    // Auto-play first animation if available
    useEffect(() => {
        if (names.length > 0 && actions[names[0]]) {
            actions[names[0]]?.reset().fadeIn(0.5).play()
        }
    }, [actions, names])

    // Aplicar transparencia/invisibilidad cuando solo queremos el contorno
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material]
                    materials.forEach(mat => {
                        if (showWireframe) {
                            // Hacer el modelo invisible, solo mostrar el contorno
                            mat.transparent = true
                            mat.opacity = 0
                        } else {
                            // Restaurar visibilidad normal
                            mat.transparent = false
                            mat.opacity = 1
                        }
                    })
                }
            }
        })
    }, [showWireframe, gltf.scene])

    return (
        <group ref={group}>
            <primitive object={gltf.scene}>
                {(showOutline || showWireframe) && (
                    <Outlines 
                        thickness={showWireframe ? 0.08 : 0.05}
                        color="#00ffff" 
                        screenspace={false}
                        opacity={1}
                        transparent={false}
                        angle={0}
                    />
                )}
            </primitive>
            {showParticles && <EdgeParticles model={gltf.scene} />}
        </group>
    )
}

const ModelPage = () => {
    const [animationInfo, setAnimationInfo] = useState<{ count: number; names: string[] }>({ 
        count: 0, 
        names: [] 
    })
    
    const [effects, setEffects] = useState({
        outline: false,
        wireframe: false,
        particles: false
    })

    return (
        <div className="w-full h-screen">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: '#1a1a1a' }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                {/* 3D Model with loading fallback */}
                <Suspense fallback={null}>
                    <Model 
                        onAnimationsLoaded={(count, names) => setAnimationInfo({ count, names })}
                        showOutline={effects.outline}
                        showWireframe={effects.wireframe}
                        showParticles={effects.particles}
                    />
                </Suspense>

                {/* Environment for better reflections (optional) */}
                <Environment preset="studio" />

                {/* Camera controls for user interaction */}
                <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                />
            </Canvas>

            {/* Optional UI overlay */}
            <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg max-w-xs">
                <h1 className="text-xl font-bold">Visor de Modelo 3D</h1>
                <p className="text-sm mt-2">Usa el mouse para rotar, hacer zoom y mover</p>
                
                {/* Animation Info */}
                <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs font-semibold mb-1">Animaciones:</p>
                    {animationInfo.count > 0 ? (
                        <div>
                            <p className="text-xs text-green-300">✓ {animationInfo.count} animación(es) detectada(s)</p>
                            <ul className="text-xs mt-1 space-y-1">
                                {animationInfo.names.map((name, idx) => (
                                    <li key={idx} className="text-gray-300">• {name}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400">○ Sin animaciones en este modelo</p>
                    )}
                </div>

                {/* Effects Controls */}
                <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs font-semibold mb-2">Efectos Visuales:</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={effects.outline}
                                onChange={(e) => setEffects(prev => ({ ...prev, outline: e.target.checked }))}
                                className="w-4 h-4"
                            />
                            <span className="text-xs">Contorno brillante</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={effects.wireframe}
                                onChange={(e) => setEffects(prev => ({ ...prev, wireframe: e.target.checked }))}
                                className="w-4 h-4"
                            />
                            <span className="text-xs">Solo silueta (sin relleno)</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={effects.particles}
                                onChange={(e) => setEffects(prev => ({ ...prev, particles: e.target.checked }))}
                                className="w-4 h-4"
                            />
                            <span className="text-xs">Partículas orbitales</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelPage;
