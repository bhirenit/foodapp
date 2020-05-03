import React from 'react';
import {Link} from 'react-router-dom';
const ProductCard = ({prod, addProdToCart, cartItems, hid}) =>{
	let doesProdExistInCart = cartItems.filter(item=> item.pid === prod.pid).length > 0;
	let path = "/admin/viewproduct/productdetails/" + prod.sku +"/" + hid;
	return(
		<div className="book-list-item">
			<img src={prod.image} alt={prod.name}/>
			<p>Name: <Link to={path}>{prod.pname}</Link></p>
			<p className="book-price"><i className="fas fa-rupee-sign"></i> {prod.price}</p>
			<button 
				onClick={()=>addProdToCart(prod)} 
				className={`cart-button ${doesProdExistInCart? 'in-cart':''}`}
			>
				{doesProdExistInCart? <span><i className="fas fa-check"></i> Added</span>: <span>Add Item</span>}
			</button>
		</div>
	);
	

}

export default ProductCard;