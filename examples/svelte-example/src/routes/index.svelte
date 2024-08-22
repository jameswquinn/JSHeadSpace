<script>
  import { getContext } from 'svelte';
  import { useHead } from 'head-space';

  const headSpace = getContext('headSpace');

  useHead({
    title: 'Home | HeadSpace Svelte Example',
    meta: {
      description: 'Welcome to the HeadSpace Svelte example home page',
      'og:title': 'HeadSpace Svelte Example - Home',
      'og:description': 'Discover how to use HeadSpace with Svelte',
    },
    links: {
      canonical: { href: 'https://example.com/' },
    },
  }, headSpace);
</script>

<h1>Welcome to the Home Page</h1>
<p>This page demonstrates basic HeadSpace usage in a Svelte component.</p>
