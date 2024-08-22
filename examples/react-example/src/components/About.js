import React from 'react';
import { useHead } from 'head-space';

function About() {
  useHead({
    title: 'About | HeadSpace React Example',
    meta: {
      description: 'Learn more about the HeadSpace React example',
      'og:title': 'HeadSpace React Example - About',
      'og:description': 'Explore the features of HeadSpace in a React environment',
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

export default About;
