import React from 'react';
import {Link} from 'react-router-dom';
const AdminProductCard = ({prod, removeFromDb, hid}) =>{
	let path = "/admin/viewproduct/productdetails/" + prod.sku + "/" +hid;
	return(
		<div>
		<div className="book-list-item">
			<img src={prod.image} alt={prod.name}/>
			<p>Name: <Link to={path}>{prod.pname}</Link></p>
			<p className="book-price"> {prod.price}</p>
			<button 
				onClick={()=>removeFromDb(prod)} 
				className={`cart-button`}
			>
				<span>Remove Product</span>
			</button>
		</div>
		</div>
	);
	

}

export default AdminProductCard;