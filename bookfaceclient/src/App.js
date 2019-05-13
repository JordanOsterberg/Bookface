import React from 'react';
import './App.css';

import ContainerComponent from './ContainerComponent.js'
import AdminComponent from './Admin/AdminComponent.js'

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Route path="/" exact component={ContainerComponent} />
            <Route path="/supersecretadminpagexdv2" component={AdminComponent} />
        </BrowserRouter>
    </div>
  );
}

export default App;
