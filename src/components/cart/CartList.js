import React from 'react';
import CartCard from './CartCard';

const CartList = ({
		cartItems,
		cartTotal,
		removeProdFromCart,
		handleIncreaseQuantity,
		handleDecreaseQuantity,
		pushToCheckout
	}) =>{
	return(
		<div className="cart-list">
			<React.Fragment>
				<div className="cart-details">
					<p>Items: {cartItems.length}</p>
					<p className="cart-total">Total: <i className="fas fa-rupee-sign"></i> {cartTotal}</p>
				</div>
				<hr />
				{cartItems.map(item=>(
					<CartCard 
						key={`cart-${item.pid}`} 
						item={item}
						removeProdFromCart={removeProdFromCart}
						handleIncreaseQuantity={handleIncreaseQuantity}
						handleDecreaseQuantity={handleDecreaseQuantity}
					/>
				))}
				{cartItems.length === 0 &&
					<h3>Your Cart is Empty</h3>
				}
			</React.Fragment>
			<button onClick={pushToCheckout}>Checkout</button>
		</div>
	);
}

export default CartList;