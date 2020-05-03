import db from "./FireBase/firebaseInit";
import React, { Component } from "react";
import ReactFileReader from "react-file-reader";

class Addproduct extends Component {
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
    this.onChange = this.onChange.bind();
    this.onChangeInt = this.onChangeInt.bind();
    this.saveproduct = this.saveproduct.bind();
    this.handleFiles = this.handleFiles.bind();
  }

  handleFiles = files => {
    this.setState({ image: files.base64 });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  };
  onChangeInt = event => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
    event.preventDefault();
  };

  saveproduct = event => {
    const {
      sku,
      pname,
      description,
      category,
      image,
      price,
      ptype,
      unittype,
      taste
    } = this.state;
    const hid = this.props.match.params.hid;
    const pid = this.generateUUID();
    const quantity = 0;
    db.settings({ timestampsInSnapshots: true });
    db.collection("Hotel").doc(hid).collection("tproducts").doc(sku)
      .set({
        sku: sku,
        pid: pid,
        pname: pname,
        description: description,
        category: category,
        image: image,
        price: price,
        ptype: ptype,
        unittype: unittype,
        quantity: quantity,
        taste: taste
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.props.history.push('/admin/viewproduct/'+hid);
    event.preventDefault();
  };
  generateUUID() {
    let d = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>sku</label>
            <div>
              <input
                type="text"
                placeholder="sku id"
                name="sku"
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <div>
            <label>Product Name</label>
            <div>
              <input
                type="text"
                placeholder="product Name"
                name="pname"
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <div>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <div>
            <label>image</label>
            <div>
              <ReactFileReader
                fileTypes={[".zip", ".jpg", ".png"]}
                base64={true}
                multipleFiles={true}
                handleFiles={this.handleFiles}
              >
                <button className="btn">Upload</button>
              </ReactFileReader>
            </div>
          </div>

          <div>
            <label>category</label>
            <div>
              <select name="category" onChange={this.onChange} required>
                <option value="none">---</option>
                <option value="starter">Starter</option>
                <option value="soup">Soup</option>
                <option value="thali">Thali</option>
                <option value="desert">Desert</option>
              </select>
            </div>
          </div>

          <div>
            <label>Price</label>
            <div>
              <input
                type="number"
                placeholder="price"
                name="price"
                onChange={this.onChangeInt}
                required
              />
            </div>
          </div>

          <div>
            <label>ptype</label>
            <div>
              <select name="ptype" onChange={this.onChange} required>
                <option value="none">---</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </div>
          </div>

          <div>
            <label>Unit type</label>
            <div>
              <select name="unittype" onChange={this.onChange} required>
                <option value="none">---</option>
                <option value="gram">Gram</option>
                <option value="kg">KG</option>
                <option value="piece">Piece</option>
              </select>
            </div>
          </div>

          <div>
            <label>Taste</label>
            <div>
              <select name="taste" onChange={this.onChange} required>
                <option value="none">---</option>
                <option value="0">No</option>
                <option value="1">low Spicy</option>
                <option value="2">avg Spicy</option>
                <option value="3">more Spicy</option>
                <option value="4">Sweet</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <button type="submit" onClick={this.saveproduct}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Addproduct;
