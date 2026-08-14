import { isDev } from './utils/constant';
import './index';

if ('serviceWorker' in navigator && !isDev) {
  // Paired with skipWaiting + clientsClaim in web.prod.js's GenerateSW
  // config: those let a newly-deployed SW take control of already-open
  // tabs instead of waiting for them to close, but the page itself is
  // still running old JS until it reloads once. Do that reload here so a
  // tab left open across a deploy actually ends up on the new build,
  // instead of silently running stale code indefinitely.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

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
