import React from 'react';



class AdminHeader extends React.Component {
	render() {
		let { keyword,
			handleSearchChange,
			isMobile, handleMobileSearch,
			handleBackClick,
			handleSearchSubmit } = this.props;
		return (
			<header className="header">
				<div className="main-title"><h1><i className="fas fa-book-open"></i> Food App</h1></div>
				<div className={`search-form-container ${isMobile ? 'search-form-active' : ''}`}>
					<div
						className={`back-button ${isMobile ? 'back-button-active' : ''}`}
						onClick={handleBackClick}
					>
						<i className="fas fa-chevron-left"></i>
					</div>
					<form className="search-form" onSubmit={(e) => handleSearchSubmit(e)}>
						<input type="text" value={keyword} placeholder="Search for Food..." onChange={(e) => handleSearchChange(e)} />
					</form>
				</div>
				<div className="mobile-search" onClick={handleMobileSearch}>
					<i className="fas fa-search search-icon" ></i>
				</div>
				<div className="cart">
				</div>
			</header>
		)
	}
}

export default AdminHeader;