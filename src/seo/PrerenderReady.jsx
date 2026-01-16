/**
 * Prerender Ready Event Dispatcher
 * Signals to vite-plugin-prerender when the page is ready for snapshot
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PrerenderReady() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Only dispatch when prerender is active
    if (typeof window !== 'undefined' && window.__PRERENDER_INJECTED) {
      // Double RAF ensures React has painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.dispatchEvent(new Event('prerender-ready'));
        });
      });
    }
  }, [pathname]);
  
  return null;
}
