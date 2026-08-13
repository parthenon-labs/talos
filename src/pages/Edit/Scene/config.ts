import { DracoCompression, SceneLoader } from '@babylonjs/core';
import { localStaticBaseUrl } from '@/utils/constant';

DracoCompression.Configuration = {
  decoder: {
    wasmUrl: `${localStaticBaseUrl}static/draco/draco_wasm_wrapper_gltf.js`,
    wasmBinaryUrl: `${localStaticBaseUrl}static/draco/draco_decoder_gltf.wasm`,
    fallbackUrl: `${localStaticBaseUrl}static/draco/draco_decoder_gltf.js`,
  },
};
SceneLoader.ShowLoadingScreen = false;
// SceneLoader.OnPluginActivatedObservable.addOnce(loader => {
//   if (loader.name === 'gltf') loader.useRangeRequests = true;
// });
