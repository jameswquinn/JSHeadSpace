<script>
  import { getContext } from 'svelte';
  import { useHead } from 'head-space';

  const headSpace = getContext('headSpace');

  useHead({
    title: 'About | HeadSpace Svelte Example',
    meta: {
      description: 'Learn more about the HeadSpace Svelte example',
      'og:title': 'HeadSpace Svelte Example - About',
      'og:description': 'Explore the features of HeadSpace in a Svelte environment',
    },
    links: {
      canonical: { href: 'https://example.com/about' },
    },
  }, headSpace);
</script>

<h1>About HeadSpace</h1>
<p>HeadSpace is a powerful, framework-agnostic library for managing head elements in web applications.</p>
