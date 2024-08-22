Certainly! I'll create the content for the `examples/svelte-example/` directory, demonstrating how to integrate HeadSpace with a Svelte application. This example will use Svelte with SvelteKit for routing and server-side rendering (SSR) capabilities.

Here's the structure and content for each file:

1. `examples/svelte-example/package.json`

```json
{
  "name": "headspace-svelte-example",
  "version": "1.0.0",
  "scripts": {
    "dev": "svelte-kit dev",
    "build": "svelte-kit build",
    "preview": "svelte-kit preview"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "next",
    "@sveltejs/kit": "next",
    "svelte": "^3.44.0"
  },
  "type": "module",
  "dependencies": {
    "head-space": "^1.0.0"
  }
}
```

2. `examples/svelte-example/svelte.config.js`

```javascript
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  }
};

export default config;
```

3. `examples/svelte-example/src/app.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body>
    <div id="svelte">%sveltekit.body%</div>
  </body>
</html>
```

4. `examples/svelte-example/src/routes/__layout.svelte`

```svelte
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
```

5. `examples/svelte-example/src/routes/index.svelte`

```svelte
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
```

6. `examples/svelte-example/src/routes/about.svelte`

```svelte
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
```

7. `examples/svelte-example/src/routes/blog/[id].svelte`

```svelte
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
```

8. `examples/svelte-example/src/hooks.js`

```javascript
import { HeadSpace } from 'head-space';

export async function handle({ event, resolve }) {
  const headSpace = new HeadSpace();
  event.locals.headSpace = headSpace;

  const response = await resolve(event);

  // Generate SSR tags
  const headTags = headSpace.generateSSRTags();

  // Inject head tags into the HTML
  const html = await response.text();
  const updatedHtml = html.replace('%sveltekit.head%', headTags);

  return new Response(updatedHtml, {
    status: response.status,
    headers: response.headers
  });
}
```

This example demonstrates:

1. Setting up HeadSpace with Svelte and SvelteKit
2. Using Svelte context to make HeadSpace available throughout the application
3. Managing head elements (title, meta tags, and links) for different routes
4. Dynamic head management based on asynchronously loaded data (in the blog post route)
5. Server-side rendering (SSR) support using SvelteKit's hooks
6. Reactive head updates using Svelte's reactivity

To run this example:

1. Navigate to the `examples/svelte-example/` directory
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser and visit `http://localhost:3000`

This setup provides a comprehensive demonstration of how HeadSpace can be integrated into a Svelte application with SvelteKit, showcasing its ability to handle dynamic content, route changes, and server-side rendering while managing head elements effectively within the Svelte ecosystem.
