import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import HeadSpace from './HeadSpace';

const HeadSpaceContext = createContext<HeadSpace | null>(null);

export function HeadSpaceProvider({ children }: { children: React.ReactNode }) {
  const [headSpace] = useState(() => new HeadSpace());

  useEffect(() => {
    return () => {
      // Clean up when the provider is unmounted
    };
  }, []);

  return (
    <HeadSpaceContext.Provider value={headSpace}>
      {children}
    </HeadSpaceContext.Provider>
  );
}

export function useHeadSpace() {
  const context = useContext(HeadSpaceContext);
  if (context === null) {
    throw new Error('useHeadSpace must be used within a HeadSpaceProvider');
  }
  return context;
}

interface HeadOptions {
  title?: string;
  meta?: Record<string, string>;
  links?: Record<string, { href: string; [key: string]: string }>;
  scripts?: Record<string, { src: string; [key: string]: string }>;
  base?: { href: string; target?: string };
}

export function useHead(options: HeadOptions) {
  const headSpace = useHeadSpace();
  const instanceRef = useRef<HeadSpace | null>(null);

  useEffect(() => {
    if (!instanceRef.current) {
      instanceRef.current = headSpace.createChild();
    }

    const instance = instanceRef.current;

    if (options.title) instance.setTitle(options.title);
    
    Object.entries(options.meta || {}).forEach(([name, content]) => {
      instance.setMeta(name, content);
    });

    Object.entries(options.links || {}).forEach(([rel, { href, ...attributes }]) => {
      instance.setLink(rel, href, attributes);
    });

    Object.entries(options.scripts || {}).forEach(([src, attributes]) => {
      instance.setScript(src, attributes);
    });

    if (options.base) {
      instance.setBase(options.base.href, options.base.target);
    }

    return () => {
      headSpace.removeChild(instance);
    };
  }, [headSpace, options]);
}
