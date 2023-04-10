import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import SellerOrders from './pages/SellerOrders';
import Adm from './pages/Adm';
import SellerOrderDetails from './pages/SellerOrderDetails';

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
        <Route exact path="/customer/orders" component={ Orders } />
        <Route path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
        {/* <Route path="/customer/orders/:id" component={ Order } /> */}
        <Route path="/admin/manage" component={ Adm } />
      </Switch>
    </div>
  );
}

export default App;
