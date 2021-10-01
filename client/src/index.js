import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// get the logged in user from the backend and pass it App.js
axios.get('/api/auth/loggedin')
.then(response => {
  console.log('logged in user', response.data);
  const user =  response.data;
  ReactDOM.render(
    <Router>
      <App user={user} />
    </Router>,
    document.getElementById('root')
  );  
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
