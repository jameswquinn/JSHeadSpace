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
