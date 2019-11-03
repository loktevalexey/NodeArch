import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AllApp from "./AllApp";

ReactDOM.hydrate(
  <BrowserRouter><AllApp /></BrowserRouter>, 
  document.getElementById('container') 
);
