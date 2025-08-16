/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';*/


//import "bulma/css/bulma.css";
//import "tailwindcss";

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import axios from "axios";
import store from './components/features/store'; // <- path ke store.js kamu

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
