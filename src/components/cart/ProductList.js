import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({pdata, addProdToCart, cartItems, hid, selectedCategory}) =>(
	<div className="book-list">
		{pdata.length > 0 && 
			<React.Fragment>
			{pdata.filter(p=>p.category === selectedCategory).map(prod =>
				<ProductCard  
					key={prod.pid}
				 	prod={prod} 
				 	addProdToCart={addProdToCart}
					 cartItems={cartItems}
					 hid = {hid}
				/>
			)}
			</React.Fragment>
		}
		{pdata.length === 0 &&
			<h3>No results found!</h3>
		}
	</div>
)

export default ProductList;