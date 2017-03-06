import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Trips from './components/Trips';
import Notes from './components/Notes';


$(function() {
  if (document.getElementById('app')) {
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
  }
  if (document.getElementById('my-trips')) {
    ReactDOM.render(
      <Trips />,
      document.getElementById('my-trips')
    );
  }
  if (document.getElementById('my-notes')) {
    ReactDOM.render(
      <Notes />,
      document.getElementById('my-notes')
    );
  }
});
