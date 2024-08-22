import { onMount, onDestroy } from 'svelte';
import HeadSpace from './HeadSpace';

const headSpace = new HeadSpace();

interface HeadOptions {
  title?: string;
  meta?: Record<string, string>;
  links?: Record<string, { href: string; [key: string]: string }>;
  scripts?: Record<string, { src: string; [key: string]: string }>;
  base?: { href: string; target?: string };
}

export function useHead(options: HeadOptions) {
  let instance: HeadSpace | null = null;

  onMount(() => {
    instance = headSpace.createChild();
    updateHead();
  });

  onDestroy(() => {
    if (instance) {
      headSpace.removeChild(instance);
    }
  });

  function updateHead() {
    if (!instance) return;

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
  }

  return {
    update: (newOptions: HeadOptions) => {
      options = newOptions;
      updateHead();
    }
  };
}

export { headSpace };
