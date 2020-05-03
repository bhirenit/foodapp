import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Admin extends Component {
    render()
    {
        var addproduct = "/admin/addproduct/"+this.props.match.params.hid;
        var viewproduct = "/admin/viewproduct/"+this.props.match.params.hid;
        return(
        <div>
       <p>
       <Link to={addproduct}>Add Product</Link>
       </p>
       <p>
       <Link to={viewproduct}>View/Remove product</Link>   
       </p>
      </div>
        );

    }
  }

  export default Admin;




