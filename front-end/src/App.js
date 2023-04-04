import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Adm from './pages/Adm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route path="/admin/manage" component={ Adm } />
      </Switch>
    </div>
  );
}

export default App;
