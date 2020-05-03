import React, { Component } from 'react';
import "./cart/App.css";
class Validate extends Component {
    tras() {
        var emailid = this.refs.emailid.value;
         this.props.history.push("/user/checkout/" + emailid +"/" + this.props.match.params.hid);
    }
    trasguest(){
        var guestid ="guest@gmail.com";
        this.props.history.push("/user/checkout/" +guestid+"/" + this.props.match.params.hid );
    }
    render() {
        return (
            <div>
                <form >
                    <div>
                    <input type="text" placeholder="enter email id" ref="emailid" ></input>
                    <input type="button" value="click" onClick={this.tras.bind(this)} ></input>
                    </div>
                    or
                    <div>
                    <input type="button" value="checkoutasguest" onClick={this.trasguest.bind(this)} ></input>
                    </div>
                </form>
            </div>

        );
    }
}

export default Validate;




