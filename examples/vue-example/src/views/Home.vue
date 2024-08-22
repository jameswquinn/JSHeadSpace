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
