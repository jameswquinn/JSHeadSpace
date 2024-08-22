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
