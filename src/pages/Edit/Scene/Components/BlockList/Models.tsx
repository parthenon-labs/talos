import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { localStaticBaseUrl } from '@/utils/constant';
import { BlockMapValue } from '../../World/types';

interface ModelsProps {
  blockValue: BlockMapValue;
  onCreated: () => void;
}

const Models = ({ blockValue, onCreated }: ModelsProps) => {
  const orbitControls = useRef<OrbitControlsImpl>(null);
  const { scene } = useGLTF(
    `${localStaticBaseUrl}static/model/${blockValue.name}.glb`,
  );
  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ position: [3, 4, 3] }}
      onCreated={onCreated}
    >
      <ambientLight intensity={0.3} />
      <pointLight intensity={0.8} position={[5, 5, 5]} />
      <group>
        <primitive
          position={[0, blockValue.y ?? 0, 0]}
          object={scene}
          scale={blockValue.scale ?? 2.6}
        />
      </group>
      <OrbitControls ref={orbitControls} maxDistance={10} minDistance={3} />
    </Canvas>
  );
};

export default Models;
