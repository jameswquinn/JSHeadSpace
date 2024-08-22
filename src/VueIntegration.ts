import { ref, onMounted, onUnmounted, watch } from 'vue';
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
  const instance = ref<HeadSpace | null>(null);

  onMounted(() => {
    instance.value = headSpace.createChild();
    updateHead();
  });

  onUnmounted(() => {
    if (instance.value) {
      headSpace.removeChild(instance.value);
    }
  });

  watch(() => options, updateHead, { deep: true });

  function updateHead() {
    if (!instance.value) return;

    if (options.title) instance.value.setTitle(options.title);
    
    Object.entries(options.meta || {}).forEach(([name, content]) => {
      instance.value!.setMeta(name, content);
    });

    Object.entries(options.links || {}).forEach(([rel, { href, ...attributes }]) => {
      instance.value!.setLink(rel, href, attributes);
    });

    Object.entries(options.scripts || {}).forEach(([src, attributes]) => {
      instance.value!.setScript(src, attributes);
    });

    if (options.base) {
      instance.value.setBase(options.base.href, options.base.target);
    }
  }
}

export { headSpace };
