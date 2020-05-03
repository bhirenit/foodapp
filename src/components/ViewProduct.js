import React, { Component } from "react";
import db from "./FireBase/firebaseInit";
import "./cart/App.css";
import AdminProductList from "./cart/AdminProductList";
import AdminHeader from "./cart/AdminHeader";
import {Link} from 'react-router-dom';

class ViewProduct extends Component {
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
      orderid: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.send = this.send.bind(this);
    this.removeFromDb = this.removeFromDb.bind(this);
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
 
  
  
 
 
  
 
  

  generateUUID() {
    let d = new Date().getTime();
    let uuid = "xyxx-xxxx-4xxx-yx".replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  

  

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    var hid = this.props.match.params.hid;
    db.settings({ timestampsInSnapshots: true });
    db.collection("Hotel").doc(hid).collection("tproducts")
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
    var path = "/admin/viewproduct/productdetails/" + sku;
    // this.props.history.push(path);
    this.props.history.push(path);
  }
  removeFromDb(pdata){
    var hid = this.props.match.params.hid;
    db.collection("Hotel")
    .doc(hid).collection("tproducts").doc(pdata.sku)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/admin/"+hid);
    })
    .catch(error => {
      console.error("Error removing document: ", error);
    });
  }
  render() {
    let { keyword, isMobile, pdata } = this.state;
    let addMore ="/admin/addproduct/" + this.props.match.params.hid;
       const filteredProducts = pdata.filter(data => {
      let productName = data.pname.toLowerCase();
      return productName.indexOf(keyword) > -1;
    });
    return (
      <div>
        <div>
          <AdminHeader
            handleSearchChange={this.handleSearchChange}
            keyword={keyword}
            isMobile={isMobile}
            handleMobileSearch={this.handleMobileSearch}
            handleBackClick={this.handleBackClick}
            handleSearchSubmit={this.handleSearchSubmit}
          />
          <div className="container">
            <AdminProductList
              pdata={filteredProducts}
              send={this.send}
              removeFromDb = {this.removeFromDb}
              hid = {this.props.match.params.hid}
            />
          </div>
          <p> <Link to={addMore}>AddMoreProduct</Link></p>
        </div>
      </div>
    );
  }
}
export default ViewProduct;
