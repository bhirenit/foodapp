import React, { Component } from "react";
import db from "./FireBase/firebaseInit";
class ViewContact extends Component {
  constructor() {
    super();
    this.state = {
        sku: null,
        pid: null,
        pname: null,
        description: null,
        category: null,
        image: null,
        price: null,
        ptype: null,
        unittype: null,
        taste: null
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    db.settings({timestampsInSnapshots: true});
    db.collection("Hotel").doc(this.props.match.params.hid).collection("tproducts")
      .where("sku", "==",  this.props.match.params.sku)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
         this.setState({ sku: doc.data().sku });
          this.setState({ pname: doc.data().pname });
          this.setState({ description: doc.data().description });
          this.setState({ category: doc.data().category });
          this.setState({ image: doc.data().image });
          this.setState({ price: doc.data().price });
          this.setState({ ptype: doc.data().ptype });
          this.setState({ unittype: doc.data().unittype });
          this.setState({ taste: doc.data().taste });
        
        });
      });
  }
  render() {
    return (
      <div>
        <h1>View Product Details</h1>
        <div>
          Product Name:{this.state.pname}
          <br />
          Description:{this.state.description}
          <br />
          Category:{this.state.category}
          <br />
          Price: {this.state.price}
          <br />
          Image :   
          <img
            padding="5px"
            width="100px"
            height="100px"
            id="base64image"
            src={this.state.image}
            alt={this.state.pname}
          />
          <br />
          Product type:{this.state.ptype}
          <br />
          Unit Type:{this.state.unittype}
          <br />
          Taste:{this.state.taste}
          <br />
        </div>
      </div>
    );
  }
}
export default ViewContact;
