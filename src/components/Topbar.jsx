import React, {PropTypes} from 'react';

const Topbar = (props) => (
	<header className="app-header text-xs-center">
		<button onClick={props.openNav} className="btn--nav">
			<img src={props.isNavOpen ? 'img/nav-close.png' : 'img/nav-open.png'} alt="menu" width="30" />
		</button>
		<button onClick={props.backToStart} >
			<img src="img/2_logos/logo.png" className="img-fluid logo" alt="Balmain" />
		</button>
	</header>
);

Topbar.propTypes = {
	backToStart: PropTypes.func,
	openNav: PropTypes.func,
	isNavOpen: PropTypes.bool
};

export default Topbar;
