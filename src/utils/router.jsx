import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScrollTrigger } from './gsap';

const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {},
});

export function normalizePath(path) {
  if (!path) return '/';
  let clean = path.split('?')[0];
  if (clean.startsWith('#/')) {
    clean = clean.substring(1);
  } else if (clean.startsWith('#')) {
    // If just anchor on same page, don't change route unless it matches a known page
    const anchor = clean.substring(1);
    if (['about', 'services', 'expertise', 'process', 'work', 'leadership', 'contact', 'enquire'].includes(anchor)) {
      clean = '/' + anchor;
    } else {
      return clean;
    }
  }
  clean = clean.trim();
  if (!clean || clean === '/' || clean === '/index.html') return '/';

  // Normalize trailing slash
  clean = clean.replace(/\/+$/, '');
  if (!clean.startsWith('/')) clean = '/' + clean;

  // Clean html extensions if any
  clean = clean.replace(/\.html$/, '');

  // Aliases
  if (clean === '/about-us') return '/about';
  if (clean === '/industries') return '/expertise';
  if (clean === '/methodology') return '/process';
  if (clean === '/insights') return '/work';
  if (clean === '/contact-us') return '/contact';
  if (clean === '/enquire-form' || clean === '/join') return '/enquire';

  return clean;
}

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    if (window.location.hash.startsWith('#/')) {
      return normalizePath(window.location.hash.substring(1));
    }
    return normalizePath(window.location.pathname);
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname;
      if (window.location.hash.startsWith('#/')) {
        path = window.location.hash.substring(1);
      }
      setCurrentPath(normalizePath(path));
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (!to) return;
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.location.href = to;
      return;
    }

    const normalized = normalizePath(to);
    if (replace) {
      window.history.replaceState({}, '', normalized);
    } else {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
