import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Button from './components/Button';

$(function() {
  if (document.getElementById('app')) {
    ReactDOM.render(
      <App/>,
      document.getElementById('app')
    );
  };
  if (document.getElementById('button')) {
    ReactDOM.render(
      <Button />,
      document.getElementById('button')
    );
  }
});
