import {
  Scene,
  SceneLoader,
  Color4,
  Color3,
  MeshBuilder,
  Vector3,
  DynamicTexture,
  StandardMaterial,
  TransformNode,
} from '@babylonjs/core';
import { pick } from 'lodash-es';
import { store } from '@/store';
import { setPositionTip, clearPositionTip } from '../store';

export const rgba = (r: number, g: number, b: number, a: number) => {
  const color = [r, g, b];
  return new Color4(...color.map(i => i / 255), a);
};

// Parses a model without adding it to the scene, so the work can overlap
// whatever else is in flight — see GameScene.loadSceneModel.
export const loadModelContainer = (scene: Scene, url: string) => {
  const filepathArr = url.split('/');
  const filename = filepathArr.at(-1);
  const filepath = filepathArr.slice(0, filepathArr.length - 1).join('/');

  return SceneLoader.LoadAssetContainerAsync(`${filepath}/`, filename, scene);
};

export const showAxis = (scene: Scene, size: number) => {
  const makeTextPlane = (text: string, color: string, s: number) => {
    const dynamicTexture = new DynamicTexture(
      'DynamicTexture',
      50,
      scene,
      true,
    );
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(
      text,
      5,
      40,
      'bold 36px Arial',
      color,
      'transparent',
      true,
    );
    const plane = MeshBuilder.CreatePlane(
      'TextPlane',
      {
        size: s,
      },
      scene,
    );
    plane.material = new StandardMaterial('TextPlaneMaterial', scene);
    plane.material.backFaceCulling = false;
    (<StandardMaterial>plane.material).specularColor = new Color3(0, 0, 0);
    (<StandardMaterial>plane.material).diffuseTexture = dynamicTexture;
    return plane;
  };

  const axisX = MeshBuilder.CreateLines(
    'axisX',
    {
      points: [
        Vector3.Zero(),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, -0.05 * size, 0),
      ],
    },
    scene,
  );
  axisX.color = new Color3(1, 0, 0);
  const xChar = makeTextPlane('X', 'red', size / 10);
  xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
  const axisY = MeshBuilder.CreateLines(
    'axisY',
    {
      points: [
        Vector3.Zero(),
        new Vector3(0, size, 0),
        new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0),
        new Vector3(0.05 * size, size * 0.95, 0),
      ],
    },
    scene,
  );
  axisY.color = new Color3(0, 1, 0);
  const yChar = makeTextPlane('Y', 'green', size / 10);
  yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);
  const axisZ = MeshBuilder.CreateLines(
    'axisZ',
    {
      points: [
        Vector3.Zero(),
        new Vector3(0, 0, size),
        new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size),
        new Vector3(0, 0.05 * size, size * 0.95),
      ],
    },
    scene,
  );
  axisZ.color = new Color3(0, 0, 1);
  const zChar = makeTextPlane('Z', 'blue', size / 10);
  zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
};

export const createGrid = (scene: Scene): TransformNode => {
  const grid = new TransformNode('scene-grid', scene);
  const y = 0.6;
  const lineColor = new Color3(41 / 255, 126 / 255, 1);
  const lineSize = 10;
  [...new Array(10).keys()].forEach(i => {
    [
      [new Vector3(-lineSize, y, i), new Vector3(lineSize, y, i)],
      [new Vector3(-lineSize, y, -i), new Vector3(lineSize, y, -i)],
      [new Vector3(i, y, -lineSize), new Vector3(i, y, lineSize)],
      [new Vector3(-i, y, -lineSize), new Vector3(-i, y, lineSize)],
    ].forEach(item => {
      [...new Array(20).keys()].forEach(j => {
        const plane = MeshBuilder.CreatePlane(
          `plane-${i}-${item.toString()}`,
          {
            width: 1,
            height: 1,
            size: 1,
          },
          scene,
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.x = item[0].x + 0.5 + j;
        plane.position.z = item[1].z - 0.5;

        plane.position.y = 0.6;
        plane.parent = grid;
      });
      let timer: number;
      scene.onPointerPick = (evt, { pickedMesh }) => {
        if (pickedMesh?.name.startsWith('plane')) {
          window.clearTimeout(timer);
          store.dispatch(
            setPositionTip({
              display: true,
              tipPosition: pick(evt, ['x', 'y']),
              value: pick(pickedMesh.position, ['x', 'z']),
            }),
          );
          timer = window.setTimeout(() => {
            store.dispatch(clearPositionTip());
          }, 3000);
        }
      };

      const line = MeshBuilder.CreateLines(
        `grid-${i}-${item.toString()}`,
        {
          points: item,
        },
        scene,
      );
      line.color = lineColor;
      line.parent = grid;
    });
  });
  return grid;
};
