import 'requestidlecallback-polyfill';

const appendScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const idle = requestIdleCallback(() => {
      const head = document.querySelector('head');
      const script = document.createElement('script');
      script.src = src;
      head?.appendChild(script);
      script.onload = () => resolve();
      script.onerror = err => reject(err);
      cancelIdleCallback(idle);
    });
  });

export default appendScript;
