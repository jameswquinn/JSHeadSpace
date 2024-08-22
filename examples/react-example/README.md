This example will include React Router for navigation and showcase more advanced usage of HeadSpace.

Here's the structure and content for each file:

1. `examples/react-example/package.json`

```json
{
  "name": "headspace-react-example",
  "version": "1.0.0",
  "description": "Example of HeadSpace integration with React",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "head-space": "^1.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.2.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.0"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

2. `examples/react-example/public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HeadSpace React Example</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

3. `examples/react-example/src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HeadSpaceProvider } from 'head-space';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeadSpaceProvider>
        <App />
      </HeadSpaceProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

4. `examples/react-example/src/App.js`

```jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import BlogPost from './components/BlogPost';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog/1">Blog Post 1</Link></li>
          <li><Link to="/blog/2">Blog Post 2</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
```

5. `examples/react-example/src/components/Home.js`

```jsx
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
```

6. `examples/react-example/src/components/About.js`

```jsx
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
```

7. `examples/react-example/src/components/BlogPost.js`

```jsx
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
```

This example demonstrates:

1. Setting up HeadSpace with React and React Router
2. Using the `HeadSpaceProvider` to wrap the entire application
3. Utilizing the `useHead` hook in functional components
4. Managing head elements (title, meta tags, and links) for different routes
5. Dynamic head management based on asynchronously loaded data (in the BlogPost component)
6. A more complex React application structure with multiple routes and components

To run this example:

1. Navigate to the `examples/react-example/` directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open your browser and visit `http://localhost:3000`

This setup provides a comprehensive demonstration of how HeadSpace can be integrated into a React application, showcasing its ability to handle dynamic content, route changes, and asynchronous data loading while managing head elements effectively.
