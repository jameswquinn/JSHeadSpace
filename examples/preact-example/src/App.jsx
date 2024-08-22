import { h } from 'preact';
import { HeadSpaceProvider } from 'head-space';
import { Home } from './Home';
import { About } from './About';

export function App() {
  return (
    <HeadSpaceProvider>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
        <main>
          {/* For simplicity, we're not using a router here */}
          <Home />
          <About />
        </main>
      </div>
    </HeadSpaceProvider>
  );
}
