<script context="module">
  export async function load({ params }) {
    // Simulated API call
    const fetchPost = async (id) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id,
        title: `Blog Post ${id}`,
        content: `This is the content of blog post ${id}.`,
      };
    };

    const post = await fetchPost(params.id);
    return { props: { post } };
  }
</script>

<script>
  import { getContext } from 'svelte';
  import { useHead } from 'head-space';

  export let post;

  const headSpace = getContext('headSpace');

  $: useHead({
    title: `${post.title} | HeadSpace Svelte Example`,
    meta: {
      description: `Read ${post.title} on our blog`,
      'og:title': `HeadSpace Svelte Example - ${post.title}`,
      'og:description': `Discover ${post.title} in our HeadSpace Svelte example`,
    },
    links: {
      canonical: { href: `https://example.com/blog/${post.id}` },
    },
  }, headSpace);
</script>

<h1>{post.title}</h1>
<p>{post.content}</p>
