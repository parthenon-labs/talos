import { createRoot } from 'react-dom/client';
import { worker } from '@mocks/browser';
import App from './App';
import '@/apis';

// This build has no live backend (portfolio demo) — always serve mocked API
// responses via MSW instead of gating on isDev. Rendering must wait for
// worker.start() to resolve: it registers/activates a Service Worker, which
// is measurably slower than the app's own first render, so without the
// await the app's very first requests (chapter list, chapter content) race
// ahead of MSW, miss the mock, and hit a real 404 with no retry — the scene
// then never loads since it's gated on that query succeeding.
const publicPrefix = process.env.PUBLIC_URL_PREFIX || '';
const mswReady = worker
  .start({
    serviceWorker: {
      url: `${publicPrefix}/mockServiceWorker.js`,
      options: {
        // Trailing slash matters: a SW's scope can never be broader than
        // the directory containing its script, so this must match the
        // script's own path exactly (e.g. '/talos/', not '/talos').
        scope: `${publicPrefix}/`,
      },
    },
    onUnhandledRequest: 'bypass',
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.warn(
      'MSW failed to start — API calls will hit the network directly and fail (no real backend):',
      err,
    );
  });

// Service Worker registration can occasionally stall (first-visit install,
// browser/network hiccups) with no rejection to catch, which would leave
// the app stuck on a blank screen forever. Cap the wait so it always
// renders — in the rare case MSW isn't ready yet, only the very first
// in-flight request can lose the race.
const mswTimeout = new Promise<void>(resolve => setTimeout(resolve, 5000));

Promise.race([mswReady, mswTimeout]).then(() => {
  createRoot(document.querySelector('#root')!).render(<App />);
});
