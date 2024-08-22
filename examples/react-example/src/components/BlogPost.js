import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHead } from 'head-space';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setPost({
        id,
        title: `Blog Post ${id}`,
        content: `This is the content of blog post ${id}.`,
      });
    }, 1000);
  }, [id]);

  useHead({
    title: post ? `${post.title} | HeadSpace React Example` : 'Loading...',
    meta: {
      description: post ? `Read ${post.title} on our blog` : 'Loading blog post...',
      'og:title': post ? `HeadSpace React Example - ${post.title}` : 'Loading...',
      'og:description': post ? `Discover ${post.title} in our HeadSpace React example` : 'Loading blog post...',
    },
    links: {
      canonical: { href: `https://example.com/blog/${id}` },
    },
  });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPost;
