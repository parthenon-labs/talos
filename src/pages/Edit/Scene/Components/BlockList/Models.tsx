import { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  PointLight,
  Vector3,
  Color4,
  SceneLoader,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { localStaticBaseUrl } from '@/utils/constant';
import { BlockMapValue } from '../../World/types';

interface ModelsProps {
  blockValue: BlockMapValue;
  onCreated: () => void;
}

const Models = ({ blockValue, onCreated }: ModelsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let disposed = false;
    const engine = new Engine(canvas, true, {
      alpha: true,
      preserveDrawingBuffer: true,
      stencil: true,
      adaptToDeviceRatio: true,
    });
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new ArcRotateCamera(
      'camera',
      0,
      0,
      1,
      Vector3.Zero(),
      scene,
    );
    camera.setPosition(new Vector3(3, 4, 3));
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 10;
    camera.attachControl(canvas, true);

    const ambientLight = new HemisphericLight(
      'ambientLight',
      Vector3.Up(),
      scene,
    );
    ambientLight.intensity = 0.3;

    const pointLight = new PointLight(
      'pointLight',
      new Vector3(5, 5, 5),
      scene,
    );
    pointLight.intensity = 0.8;

    SceneLoader.ImportMeshAsync(
      '',
      `${localStaticBaseUrl}static/model/`,
      `${blockValue.name}.glb`,
      scene,
    ).then(({ meshes }) => {
      if (disposed) return;
      const root = meshes[0];
      root.position = new Vector3(0, blockValue.y ?? 0, 0);
      root.scaling = Vector3.One().scale(blockValue.scale ?? 2.6);
      onCreated();
    });

    engine.runRenderLoop(() => scene.render());

    const resizeObserver = new ResizeObserver(() => engine.resize());
    resizeObserver.observe(canvas);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full outline-none"
    />
  );
};

export default Models;
