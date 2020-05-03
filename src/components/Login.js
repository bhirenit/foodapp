import React, {Component} from 'react'

class Login extends Component {
    sendToAdmin(){
        var hid = this.refs.hid.value;
        this.props.history.push("/admin/"+hid);
    }
    render()
    {
        return(
        <div>
       <p>
           <form onSubmit={this.sendToAdmin.bind(this)}>
                <input type="text"  ref ="hid"/>
                <input type="submit" value="Submit"/>
           </form>
       </p>
      </div>
        );

    }
  }

  export default Login;




