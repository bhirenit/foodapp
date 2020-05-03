import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
    render()
    {
        return(
        <div>
       <p>
       <Link to="/login">Admin</Link>
       </p>
       <p>
       <Link to="/view/TGB">User</Link>   
       </p>
       
      </div>
        );

    }
  }

  export default Home;




