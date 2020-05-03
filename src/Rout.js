import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Validate from './components/Validate';
import AddProduct from './components/AddProduct';
import View from './components/View';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Login from './components/Login';
import ViewProduct from './components/ViewProduct';

const Rout = (props) =>
  (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact ></Route>
          <Route path="/home" component={Home} ></Route>
           <Route path="/admin" component={Admin} exact ></Route> 
          <Route path="/admin/:hid" component={Admin} exact ></Route>
          <Route path="/user/validate/:hid" component={Validate} exact></Route>
          <Route path="/view/:hid" component={View} ></Route>
          <Route path="/admin/addproduct/:hid" component={AddProduct} exact ></Route>
          <Route path="/admin/viewproduct/:hid" component={ViewProduct} exact ></Route>
          <Route path="/admin/viewproduct/productdetails/:sku/:hid" component={ProductDetails} exact></Route>
          <Route path="/user/checkout/:emailid/:hid" component={Checkout} exact ></Route>
          <Route path="/login" component={Login} ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
export default Rout;
