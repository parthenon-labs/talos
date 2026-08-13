import fs from 'fs';
import { exec } from 'child_process';

const dir = './public/static/model/';

fs.readdir(dir, (err, files) => {
  const glbFile = files.filter(
    file => file.endsWith('.glb') && !file.startsWith('role'),
  );

  glbFile.forEach(file => {
    exec(
      `npx gltf-pipeline -i ${dir}${file} -o ./public/static/models/${file} -d`,
    );
  });
});
