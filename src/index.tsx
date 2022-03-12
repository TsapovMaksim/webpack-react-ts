import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import Services from './services';
import ServicesProvider from './provider';
import './style.css';

const root = document.getElementById('root');

// app state
const services = new Services();

ReactDOM.render(
  <>
    <ServicesProvider services={services}>
      <App />
    </ServicesProvider>
  </>,
  root
);
