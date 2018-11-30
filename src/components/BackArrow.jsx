import React, {PropTypes} from 'react';

import {FaAngleLeft} from 'react-icons/fa';

const BackArrow = (props) => (
	<div className="text-left py-2 back-container">
		<button onClick={props.handleBackClick}>
			<FaAngleLeft /> Back
		</button>
	</div>
);

BackArrow.propTypes = {
	handleBackClick: PropTypes.func
};

export default BackArrow;
