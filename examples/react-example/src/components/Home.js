import React from 'react';
import { useHead } from 'head-space';

function Home() {
  useHead({
    title: 'Home | HeadSpace React Example',
    meta: {
      description: 'Welcome to the HeadSpace React example home page',
      'og:title': 'HeadSpace React Example - Home',
      'og:description': 'Discover how to use HeadSpace with React',
    },
    links: {
      canonical: { href: 'https://example.com/' },
    },
  });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This page demonstrates basic HeadSpace usage in a React component.</p>
    </div>
  );
}

export default Home;
