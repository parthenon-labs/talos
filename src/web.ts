import { isDev } from './utils/constant';
import './index';

if ('serviceWorker' in navigator && !isDev) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL_PREFIX || ''}/service-worker.js`)
      .then(registration => {
        // eslint-disable-next-line no-console
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        // eslint-disable-next-line no-console
        console.log('SW registration failed: ', registrationError);
      });
  });
}
