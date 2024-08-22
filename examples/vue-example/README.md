Certainly! I'll create the content for the `examples/vue-example/` directory, demonstrating how to integrate HeadSpace with a Vue.js application. This example will use Vue 3 with the Composition API and Vue Router for navigation.

Here's the structure and content for each file:

1. `examples/vue-example/package.json`

```json
{
  "name": "headspace-vue-example",
  "version": "1.0.0",
  "description": "Example of HeadSpace integration with Vue.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "head-space": "^1.0.0",
    "vue": "^3.2.13",
    "vue-router": "^4.0.12"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3"
  }
}
```

2. `examples/vue-example/public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>HeadSpace Vue Example</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

3. `examples/vue-example/src/main.js`

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { HeadSpacePlugin } from './plugins/HeadSpacePlugin'

createApp(App)
  .use(router)
  .use(HeadSpacePlugin)
  .mount('#app')
```

4. `examples/vue-example/src/plugins/HeadSpacePlugin.js`

```javascript
import { HeadSpace } from 'head-space'

export const HeadSpacePlugin = {
  install: (app) => {
    const headSpace = new HeadSpace()
    app.config.globalProperties.$headSpace = headSpace
    app.provide('headSpace', headSpace)
  }
}
```

5. `examples/vue-example/src/App.vue`

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/blog/1">Blog Post 1</router-link> |
      <router-link to="/blog/2">Blog Post 2</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

6. `examples/vue-example/src/router/index.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import BlogPost from '../views/BlogPost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

7. `examples/vue-example/src/views/Home.vue`

```vue
<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>This page demonstrates basic HeadSpace usage in a Vue component.</p>
  </div>
</template>

<script>
import { useHead } from 'head-space'
import { inject } from 'vue'

export default {
  name: 'Home',
  setup() {
    const headSpace = inject('headSpace')

    useHead({
      title: 'Home | HeadSpace Vue Example',
      meta: {
        description: 'Welcome to the HeadSpace Vue example home page',
        'og:title': 'HeadSpace Vue Example - Home',
        'og:description': 'Discover how to use HeadSpace with Vue',
      },
      links: {
        canonical: { href: 'https://example.com/' },
      },
    }, headSpace)

    return {}
  }
}
</script>
```

8. `examples/vue-example/src/views/About.vue`

```vue
<template>
  <div class="about">
    <h1>About HeadSpace</h1>
    <p>HeadSpace is a powerful, framework-agnostic library for managing head elements in web applications.</p>
  </div>
</template>

<script>
import { useHead } from 'head-space'
import { inject } from 'vue'

export default {
  name: 'About',
  setup() {
    const headSpace = inject('headSpace')

    useHead({
      title: 'About | HeadSpace Vue Example',
      meta: {
        description: 'Learn more about the HeadSpace Vue example',
        'og:title': 'HeadSpace Vue Example - About',
        'og:description': 'Explore the features of HeadSpace in a Vue environment',
      },
      links: {
        canonical: { href: 'https://example.com/about' },
      },
    }, headSpace)

    return {}
  }
}
</script>
```

9. `examples/vue-example/src/views/BlogPost.vue`

```vue
<template>
  <div class="blog-post" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { useHead } from 'head-space'
import { inject, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BlogPost',
  setup() {
    const headSpace = inject('headSpace')
    const route = useRoute()
    const post = ref(null)

    const fetchPost = async (id) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      post.value = {
        id,
        title: `Blog Post ${id}`,
        content: `This is the content of blog post ${id}.`,
      }
    }

    onMounted(() => fetchPost(route.params.id))

    watch(() => route.params.id, (newId) => fetchPost(newId))

    useHead(() => ({
      title: post.value ? `${post.value.title} | HeadSpace Vue Example` : 'Loading...',
      meta: {
        description: post.value ? `Read ${post.value.title} on our blog` : 'Loading blog post...',
        'og:title': post.value ? `HeadSpace Vue Example - ${post.value.title}` : 'Loading...',
        'og:description': post.value ? `Discover ${post.value.title} in our HeadSpace Vue example` : 'Loading blog post...',
      },
      links: {
        canonical: { href: `https://example.com/blog/${route.params.id}` },
      },
    }), headSpace)

    return { post }
  }
}
</script>
```

This example demonstrates:

1. Setting up HeadSpace with Vue 3 and Vue Router
2. Creating a Vue plugin for HeadSpace to make it available throughout the application
3. Using the Composition API with `useHead` in Vue components
4. Managing head elements (title, meta tags, and links) for different routes
5. Dynamic head management based on asynchronously loaded data (in the BlogPost component)
6. Reactive head updates using Vue's reactivity system

To run this example:

1. Navigate to the `examples/vue-example/` directory
2. Run `npm install` to install dependencies
3. Run `npm run serve` to start the development server
4. Open your browser and visit `http://localhost:8080`

This setup provides a comprehensive demonstration of how HeadSpace can be integrated into a Vue.js application, showcasing its ability to handle dynamic content, route changes, and asynchronous data loading while managing head elements effectively within the Vue ecosystem.
