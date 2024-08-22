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
