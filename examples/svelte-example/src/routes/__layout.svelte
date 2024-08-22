<script>
  import { HeadSpace } from 'head-space';
  import { setContext } from 'svelte';

  const headSpace = new HeadSpace();
  setContext('headSpace', headSpace);
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/blog/1">Blog Post 1</a>
  <a href="/blog/2">Blog Post 2</a>
</nav>

<slot />
