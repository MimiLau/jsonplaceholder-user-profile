import React, {PropTypes} from 'react';

const User = (props) => {
	const user = props.user;

	return (
		<div className="col-6 py-3 user-block">
			<button onClick={props.handleClick} className="text-left">
				<p className="h5 font-italic text-muted">#{user.id}</p>
				<p className="h4">{user.name}</p>
			</button>
		</div>
	);
};

User.propTypes = {
	user: PropTypes.object,
	handleClick: PropTypes.func
};

export default User;
