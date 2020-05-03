import React from 'react';
import AdminProductCard from './AdminProductCard';

const AdminProductList = ({pdata, removeFromDb, hid}) =>(
	<div className="book-list">
		{pdata.length > 0 && 
			<React.Fragment>
			{pdata.map(prod =>
				<AdminProductCard  
					key={prod.pid}
                     prod={prod} 
					removeFromDb = {removeFromDb}
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

export default AdminProductList;