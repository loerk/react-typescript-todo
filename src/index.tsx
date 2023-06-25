import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoContextProvider } from './contexts/TodoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TodoContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodoContextProvider>
);
