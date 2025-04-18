import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // ⬅️ Import it!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ⬅️ Wrap App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
