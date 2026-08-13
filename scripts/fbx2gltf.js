/* eslint-disable no-console */
const { exec } = require('child_process');
const convert = require('fbx2gltf');
const { file } = require('minimist')(process.argv.slice(2));

convert(
  `./public/static/model/${file}.fbx`,
  `./public/static/model/${file}.glb`,
  [],
).then(
  destPath => {
    // yay, do what we will with our shiny new GLB file!
    exec(`npx gltf-pipeline -i ${destPath} -o ${destPath} -d`);
  },
  error => {
    // ack, conversion failed: inspect 'error' for details
    console.error(error);
  },
);
