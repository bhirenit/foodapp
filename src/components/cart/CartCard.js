import React from 'react';
//import db from "./FireBase/firebaseInit";

// db.collection("users")
//       .add({
//         pname: pname,
// 		quantity:quantity
// 	  })

const CartCard = ({item, removeProdFromCart, handleIncreaseQuantity, handleDecreaseQuantity}) =>{
	//var localItem =JSON.parse(localStorage.getItem('localQuantity'));
	return(
		<div>
		<div className="cart-list-item">
			<img src={item.image} alt={item.pname}/>
			<div className="cart-item-content">
				<p>{item.pname}</p>
				<p className="cart-item-price">
					<i className="fas fa-rupee-sign"></i> {`${item.price * item.quantity}`}
				</p>
				<div className="cart-quantity">
					<button onClick={()=>handleDecreaseQuantity(item)}>-</button>
					<div>{item.quantity}</div>
					<button onClick={()=>handleIncreaseQuantity(item)}>+</button>
				</div>
			</div>
			<div className="cart-remove-btn" onClick={()=>removeProdFromCart(item)}>
				<i className="far fa-trash-alt">R</i>
			</div>
		</div>
			Name : {item.pname}&nbsp;
			Quantity :{item.quantity}
			</div>
	);
}

export default CartCard;