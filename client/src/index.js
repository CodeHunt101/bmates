import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './features/users/users.css';
import './features/reservations/reservations.css';
import './features/listings/listings.css';
import App from './App';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
// import { store } from './app/store'
// import { Provider } from 'react-redux'



// import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      {/* <HashRouter> */}
      <Router>
        <App />
      </Router>
      {/* </HashRouter> */}
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
