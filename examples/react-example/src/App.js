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
