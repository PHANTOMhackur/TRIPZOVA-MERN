import { useLayoutEffect } from 'react';

const PAGE_READY_CLASS = 'tripzova-page-ready';
const STYLE_ATTR = 'data-tripzova-page-style';
const SCRIPT_ATTR = 'data-tripzova-legacy';

function setPageReady(ready) {
  document.body.classList.toggle(PAGE_READY_CLASS, ready);
  document.body.setAttribute('aria-busy', ready ? 'false' : 'true');
}

function appendStyle(href) {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(STYLE_ATTR, href);

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(link);
    };

    link.onload = finish;
    link.onerror = () => {
      console.warn(`TRIPZOVA stylesheet failed to load: ${href}`);
      finish();
    };

    document.head.appendChild(link);

    // Safety fallback: never leave the UI permanently covered if a CDN is slow.
    window.setTimeout(finish, 7000);
  });
}

function appendScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.setAttribute(SCRIPT_ATTR, 'script');
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function useLegacyPage({ styles = [], scripts = [], beforeLoad, dispatchReady = true }) {
  useLayoutEffect(() => {
    let cancelled = false;
    const created = [];

    // useLayoutEffect runs before the browser paints the newly mounted route.
    // Cover the page while its legacy CSS is being fetched to prevent FOUC.
    setPageReady(false);

    const run = async () => {
      if (beforeLoad) beforeLoad();

      try {
        // Load all page styles in parallel and WAIT for them before revealing JSX.
        const styleNodes = await Promise.all(styles.map(appendStyle));
        if (cancelled) {
          styleNodes.forEach((node) => node.remove());
          return;
        }
        created.push(...styleNodes);

        // Once styling is ready, reveal the route immediately. Data/scripts may
        // continue initializing underneath without ever showing raw HTML.
        requestAnimationFrame(() => {
          if (!cancelled) setPageReady(true);
        });

        for (const src of scripts) {
          if (cancelled) return;
          const script = await appendScript(src);
          created.push(script);

          if (src.includes('verify.msg91.com') && window.__tripzovaAutoInitMsg91) {
            if (typeof window.initSendOTP === 'function' && window.configuration) {
              window.initSendOTP(window.configuration);
            }
          }
        }

        if (!cancelled && window.__tripzovaGoogleMapsSrc) {
          const mapsScript = await appendScript(window.__tripzovaGoogleMapsSrc);
          mapsScript.id = 'tripzova-google-maps';
          created.push(mapsScript);
        }

        if (!cancelled && dispatchReady) {
          document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
        }
      } catch (error) {
        console.error('TRIPZOVA page script failed:', error);
        // Styling is already loaded at this point in normal cases. Never trap
        // the user behind the loader because an optional legacy script failed.
        if (!cancelled) setPageReady(true);
      }
    };

    run();

    return () => {
      cancelled = true;
      // Hide the outgoing DOM before its route-specific styles are removed.
      setPageReady(false);
      created.forEach((node) => node.remove());
      delete window.__tripzovaAutoInitMsg91;
      delete window.__tripzovaGoogleMapsSrc;
    };
  }, []);
}
