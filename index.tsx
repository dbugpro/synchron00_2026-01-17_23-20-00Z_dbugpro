import React from 'react';
import ReactDOM from 'react-dom/client';
// Redirect to dashboard version to confirm linking readiness
import App from './db/dashboard/components/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);