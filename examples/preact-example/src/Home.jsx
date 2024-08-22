import { h } from 'preact';
import { useHead } from 'head-space';

export function Home() {
  useHead({
    title: 'Home | HeadSpace Preact Example',
    meta: {
      description: 'Welcome to the HeadSpace Preact example home page',
      'og:title': 'HeadSpace Preact Example - Home',
      'og:description': 'Discover how to use HeadSpace with Preact',
    },
    links: {
      canonical: { href: 'https://example.com/' },
    },
  });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This page demonstrates basic HeadSpace usage in a Preact component.</p>
    </div>
  );
}
