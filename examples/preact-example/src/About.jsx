import { h } from 'preact';
import { useHead } from 'head-space';

export function About() {
  useHead({
    title: 'About | HeadSpace Preact Example',
    meta: {
      description: 'Learn more about the HeadSpace Preact example',
      'og:title': 'HeadSpace Preact Example - About',
      'og:description': 'Explore the features of HeadSpace in a Preact environment',
    },
    links: {
      canonical: { href: 'https://example.com/about' },
    },
  });

  return (
    <div>
      <h1>About HeadSpace</h1>
      <p>HeadSpace is a powerful, framework-agnostic library for managing head elements in web applications.</p>
    </div>
  );
}
