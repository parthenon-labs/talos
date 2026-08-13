import imagemin from 'imagemin';
import webp from 'imagemin-webp';

imagemin(['src/assets/*.{jpg,png}'], {
  destination: 'src/assets',
  plugins: [webp({ quality: 100 })],
});
