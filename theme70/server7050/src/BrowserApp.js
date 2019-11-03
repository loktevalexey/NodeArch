import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CoreApp from "./CoreApp";

ReactDOM.hydrate(
  <BrowserRouter><CoreApp /></BrowserRouter>, 
  document.getElementById('container') 
);
