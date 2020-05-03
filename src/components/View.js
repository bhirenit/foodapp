import React, { Component } from "react";
import db from "./FireBase/firebaseInit";
import Header from "./cart/Header";
import ProductList from "./cart/ProductList";
import CartList from "./cart/CartList";
import "./cart/App.css";
import _ from 'lodash';

class View extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      cart: [],
      isMobile: false,
      cartTotal: 0,
      openCart: false,
      data: [],
      pdata: [],
      available: false,
      ckid: "",
      isCheckoutSet: false,
      orderid: "",
      categories: [
       'starter', 'thali', 'desert', 'soup'
      ],
      selectedCategoryName: null,
      currentProducts: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.addProdToCart = this.addProdToCart.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.removeProdFromCart = this.removeProdFromCart.bind(this);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.send = this.send.bind(this);
    this.pushToCheckout = this.pushToCheckout.bind(this);
    this.setLocalUser = this.setLocalUser.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  onSelectCategory(name) {
    this.setState({
      selectedCategoryName: name
    });
    // e.preventDefault();
  }
  handleSearchChange(e) {
    this.setState({
      keyword: e.target.value.toLowerCase()
    });
  }
  handleSearchSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch() {
    this.setState({
      isMobile: true
    });
  }
  handleBackClick() {
    this.setState({
      isMobile: false,
      keyword: ""
    });
  }
  pushToCheckout() {
    db.collection("orders")
      .doc(localStorage.getItem("localOrderid"))
      .get()
      .then(docSnapshot => {
        if (docSnapshot.data().emailid === "guest@gmail.com") {
          this.props.history.push("/user/validate/"+this.props.match.params.hid);
        } else {
          this.props.history.push(
            "/user/checkout/" + docSnapshot.data().emailid +"/" + this.props.match.params.hid
          );}
      });
  }
  addProdToCart(pdata) {
    let cartItems = this.state.cart.slice();
    let cartTotal = this.state.cartTotal;
    var ckid = this.state.ckid;
    var orderid = this.state.orderid;
    var quantityList = JSON.parse(localStorage.getItem("localQuantity"));
    let doesBookExist =
      cartItems.filter(item => item.pid === pdata.pid).length > 0;
    if (!doesBookExist) {
      cartItems.push({ ...pdata, quantity: 1 });
      this.setState({
        cart: cartItems,
        cartTotal: (cartTotal += pdata.price)
      });
      if (this.state.available) {
        pdata.quantity = 1 + quantityList[pdata.sku];
      } else {
        pdata.quantity = 1;
      }
      this.setCheckoutVarient(ckid, orderid, pdata);
      this.setCheckout(ckid, orderid);
    }
  }
  setCheckoutVarient(ckid, orderid, pdata) {
    db.collection("orders")
      .doc(orderid)
      .collection("checkout")
      .doc(ckid)
      .collection("checkoutvarient")
      .doc(pdata.sku)
      .set({
        quantity: pdata.quantity,
        cvid: pdata.sku,
        price: pdata.price,
        ckid: ckid
      });
  }

  getCkid() {
    db.settings({ timestampsInSnapshots: true });
    var localOrderid = localStorage.getItem("localOrderid");
    if (localOrderid === null) {
      this.setState({
        orderid: this.generateUUID(),
        ckid: this.generateUUID()
      });
    } else {
      this.setState({
        orderid: localOrderid,
        ckid: this.generateUUID(),
        isCheckoutSet: true
      });
    }
  }
  setLocalUser(ckid, orderid) {
    if (localStorage.getItem("localOrderid") == null) {
      localStorage.setItem("localOrderid", orderid);
      if (localStorage.getItem("localCkid") == null) {
        var ckidList = [];
        ckidList[0] = ckid;
        localStorage.setItem("localCkid", JSON.stringify(ckidList));
      } else {
        ckidList = JSON.parse(localStorage.getItem("localCkid"));
        ckidList.push(ckid);
        localStorage.setItem("localCkid", JSON.stringify(ckidList));
      }
    } else {
      this.setState({ orderid: orderid, isCheckoutSet: true });
      if (localStorage.getItem("localCkid") == null) {
        ckidList[0] = ckid;
        localStorage.setItem("localCkid", JSON.stringify(ckidList));
      } else {
        ckidList = JSON.parse(localStorage.getItem("localCkid"));
        ckidList.push(ckid);
        localStorage.setItem("localCkid", JSON.stringify(ckidList));
      }
    }
  }
  setCheckout(ckid, orderid) {
    if (!this.state.isCheckoutSet) {
      db.collection("orders")
        .doc(orderid)
        .set({
          emailid: "guest@gmail.com",
          orderstatus: "inprogress",
          paymentstatus: "pending",
          createdate: new Date().getTime(),
          updatetime: new Date().getTime()
        });
      db.collection("orders")
        .doc(orderid)
        .collection("checkout")
        .doc(ckid)
        .set({
          emailid: "guest@gmail.com",
          status: "pending",
          createdate: new Date().getTime(),
          ckid: ckid,
          updatetime: new Date().getTime()
        });
      this.setState({ isCheckoutSet: true });
      this.setLocalUser(ckid, orderid);
    } else {
      db.collection("orders")
        .doc(orderid)
        .update({
          updatetime: new Date().getTime()
        });
      db.collection("orders")
        .doc(orderid)
        .collection("checkout")
        .doc(ckid)
        .get()
        .then(docSnapshot => {
          if (!docSnapshot.exists) {
            db.collection("orders")
              .doc(orderid)
              .collection("checkout")
              .doc(ckid)
              .set({
                emailid: "guest@gmail.com",
                status: "pending",
                createdate: new Date().getTime(),
                ckid: ckid,
                updatetime: new Date().getTime()
              });
              this.pushToLocal(ckid);
          }
        });
    }
  }
  pushToLocal(ckid) {
    if (localStorage.getItem("localCkid") == null) {
      var ckidList = [];
      ckidList[0] = ckid;
      localStorage.setItem("localCkid", JSON.stringify(ckidList));
    } else {
      ckidList = JSON.parse(localStorage.getItem("localCkid"));
      ckidList.push(ckid);
      localStorage.setItem("localCkid", JSON.stringify(ckidList));
    }
  }
  updateCheckoutVarient(ckid, orderid, pdata) {
    db.collection("orders")
      .doc(orderid)
      .collection("checkout")
      .doc(ckid)
      .collection("checkoutvarient")
      .doc(pdata.sku)
      .update({
        quantity: pdata.quantity
      });
  }

  generateUUID() {
    let d = new Date().getTime();
    let uuid = "xyxx-xxxx-4xxx-yx".replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  removeProdFromCart(pdata) {
    let cartItems = this.state.cart.slice();
    let cartTotal = this.state.cartTotal;
    var ckid = this.state.ckid;
    var orderid = this.state.orderid;
    pdata.quantity = 0;
    cartItems = cartItems.filter(cartItem => cartItem.pid !== pdata.pid);
    this.setState({
      cart: cartItems,
      cartTotal: (cartTotal -= pdata.price * pdata.quantity)
    });
    this.updateCheckoutVarient(ckid, orderid, pdata);
  }

  handleIncreaseQuantity(pdata) {
    let cartItems = this.state.cart.slice();
    let cartTotal = this.state.cartTotal;
    let Index = cartItems.findIndex(item => item.pid === pdata.pid);
    cartItems[Index].quantity += 1;
    var ckid = this.state.ckid;
    var orderid = this.state.orderid;
    this.setState({
      cart: cartItems,
      cartTotal: (cartTotal += pdata.price)
    });
    this.updateCheckoutVarient(ckid, orderid, pdata);
  }
  handleDecreaseQuantity(pdata) {
    let cartItems = this.state.cart.slice();
    let cartTotal = this.state.cartTotal;
    var ckid = this.state.ckid;
    var orderid = this.state.orderid;
    let Index = cartItems.findIndex(item => item.pid === pdata.pid);
    let currentQuantity = cartItems[Index].quantity;
    if (currentQuantity > 1) {
      cartItems[Index].quantity -= 1;
      this.setState({
        cart: cartItems,
        cartTotal: (cartTotal -= pdata.price)
      });
      this.updateCheckoutVarient(ckid, orderid, pdata);
    } else {
      this.removeProdFromCart(pdata);
      pdata.quantity = 0;
      this.updateCheckoutVarient(ckid, orderid, pdata);
    }
  }
  handleCartOpen() {
    this.setState({
      openCart: !this.state.openCart
    });
  }
  componentDidMount() {
    this.fetchData();
    this.getCkid();
  }
  fetchData() {
    db.settings({ timestampsInSnapshots: true });
    db.collection("Hotel").doc(this.props.match.params.hid).collection("tproducts")
      .get()
      .then(querySnapshot => {
        let objArray = [];
        querySnapshot.forEach(doc => {
          objArray.push(doc.data());
        });
        this.setState({ data: objArray, pdata: objArray });
      });
  }
  send(sku) {
    var path = "/admin,props:/viewproduct/productdetails/" + sku;
    this.props.history.push(path);
  }
  render() {
    let { keyword, cart, cartTotal, isMobile, pdata,currentProducts } = this.state;
    let { categories, selectedCategoryName } = this.state;
    const defaultCategory = _.first(categories);
      var selectedCategory = _.find(categories, i => i === selectedCategoryName)||defaultCategory;
    const filteredProducts = pdata.filter(data => {
      let productName = data.pname.toLowerCase();
      return productName.indexOf(keyword) > -1;
    });
    return (
      <div>
        <div>
          <Header
            handleSearchChange={this.handleSearchChange}
            cartCount={this.state.cart.length}
            handleCartOpen={this.handleCartOpen}
            keyword={keyword}
            isMobile={isMobile}
            handleMobileSearch={this.handleMobileSearch}
            handleBackClick={this.handleBackClick}
            handleSearchSubmit={this.handleSearchSubmit}
          />
          <div className="container">
          <div>   <CategoryFilter categories={categories} onSelectCategory={this.onSelectCategory}  /></div>
            <ProductList
              pdata={filteredProducts}
              addProdToCart={this.addProdToCart}
              cartItems={cart}
              send={this.send}
              hid = {this.props.match.params.hid}
              selectedCategory = {selectedCategory}
            />
            <div
              className={`cart-container ${
                this.state.openCart ? "cart-open" : ""
              }`}
            >
              <CartList
                cartItems={cart}
                cartTotal={cartTotal}
                removeProdFromCart={this.removeProdFromCart}
                handleIncreaseQuantity={this.handleIncreaseQuantity}
                handleDecreaseQuantity={this.handleDecreaseQuantity}
                pushToCheckout={this.pushToCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
var CategoryFilter = ({ categories, onSelectCategory}) => {
  const links = categories.map((i,key) => (
    <div>
      <button onClick={() => onSelectCategory(i)}>
        { i }
      </button>
    </div>
  ));
  return (
    <div>
       { links }
    </div>
  )
};
export default View;
