import React, {Component} from 'react';
import fetch from 'node-fetch';

import UserProfile from '../container/UserProfile';
import User from '../components/User';
import BackArrow from '../components/BackArrow';

class App extends Component {
	constructor(props) {
		super(props);

		this.onUserClick = this.onUserClick.bind(this);
		this.onBackClick = this.onBackClick.bind(this);

		this.state = {
			users: null,
			activeUserId: null,
			isOnUserProfile: false
		};
	}

	componentDidMount() {
		this.getUserList();
	}

	onBackClick() {
		this.setState({
			isOnUserProfile: false
		})
	}

	onUserClick(userId) {
		this.setState({
			isOnUserProfile: true,
			activeUserId: userId
		})
	}

	getUserList() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(json =>
				this.setState({
					users: json
				})
			)
	}

	renderHomePage() {
		let rows = this.state.users.map((user) =>
			<User
				key={user.id}
				user={user}
				handleClick={() => this.onUserClick(user.id)}
			/>
		);

		return (
			<div>
				<div className="home__hero px-3 pb-3">
					<h1 className="text-capitalize">Simple social network app</h1>
				</div>
				<div className="row user-list">
					{rows}
				</div>
			</div>
		);
	}

	render() {
		return (
			<main className="app p-0">
				{this.state.users && !this.state.isOnUserProfile &&
					<div>
						{this.renderHomePage()}
						{this.state.isNavExist && this.renderNav()}
					</div>
				}
				{this.state.isOnUserProfile &&
					<BackArrow handleBackClick={this.onBackClick} />
				}
				{this.state.isOnUserProfile &&
					<UserProfile activeUserId={this.state.activeUserId} />
				}
			</main>
		);
	}
}

export default App;
