import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Parent from './components/parent';
import EventHandlers from './components/EventHandlers';
import UseStateExample from './components/UseStateExample';
import TwoWayDataBinding from './components/TwoWayDataBinding';
import ConditionalRendering from './components/ConditionalRendering';
import UseEffectExample from './components/UseEffectExample1';
import ProductsData from './components/GetProductsApiCall';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsData />
    <App />
  </React.StrictMode>
);
reportWebVitals();
