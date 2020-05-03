import React, {Component} from 'react';
import db from "./FireBase/firebaseInit";
import "./cart/App.css";

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
          data:{},
          orderData: [],
          total:0
        };
        this.orderMore =this.orderMore.bind(this);
    }
    updateEmail(email){
        db.settings({ timestampsInSnapshots: true });
        db.collection("orders").doc(localStorage.getItem('localOrderid'))
        .update({
            emailid: email
        });
    }
    fetchData() {
        let total= 0;
        let objArray = [];
        var tckid = JSON.parse(localStorage.getItem('localCkid'));
        db.settings({ timestampsInSnapshots: true });
        tckid.map(ckid=>{
            db.collection("orders").doc(localStorage.getItem('localOrderid')).collection("checkout").doc(ckid).collection("checkoutvarient")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                objArray.push(doc.data());
                total = total+ (doc.data().price*doc.data().quantity);
              });
              this.setState({ orderData: objArray, total: total });
            });
        })
      }
      orderMore(){
          this.props.history.push("/view/"+this.props.match.params.hid);
      }
      componentDidMount(){
          this.fetchData();
      }
    render()
    {
       
        let { orderData ,total} = this.state;
        this.updateEmail(this.props.match.params.emailid);
        return(
            <div>
        <div> 
           {orderData.length>0 && orderData.map((item,index)=>(
           <div key={index}> 
		<div >
		</div>
			Name : {item.cvid}&nbsp;
            Quantity :{item.quantity}&nbsp;
            price :{`${item.price * item.quantity}`} $
			</div>))} 
            total:{total}
      </div>
      <button onClick={this.orderMore}>Order More</button>
      <button >Pay Bill</button>
      </div>
        );

    }
  }

  export default Checkout;




