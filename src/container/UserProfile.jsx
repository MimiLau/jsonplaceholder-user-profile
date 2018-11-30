import React, {Component, PropTypes} from 'react';
import fetch from 'node-fetch';

import {FaMapMarkerAlt, FaAngleDown} from 'react-icons/fa';

import PhotoAlbum from '../components/PhotoAlbum';
import Todos from '../components/Todos';
import Posts from '../components/Posts';

class UserProfile extends Component {
	constructor(props) {
		super(props);

		this.onTabClick = this.onTabClick.bind(this);

		this.state = {
			userData: null,
			activeTab: 'photo',
			isExpendAdd: false
		};
	}

	componentDidMount() {
		this.getUserData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeUserId !== this.props.activeUserId) {
			this.getUserData();
		}
	}

	onTabClick(cat) {
		this.setState({
			activeTab: cat
		})
	}

	onExpendAddClick() {
		this.setState({
			isExpendAdd: !this.state.isExpendAdd
		})
	}

	getUserData() {
		fetch(`https://jsonplaceholder.typicode.com/users/${this.props.activeUserId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					userData: json
				})
			)
	}

	render() {
		return (
			<div className="user__info">
				{this.state.userData &&
					<div>
						<div className="user__username text-center">
							@{this.state.userData.username}
						</div>
						<div className="text-center">
							<div className="user__initial my-3">
								{this.state.userData.name.charAt(0)}
							</div>
						</div>
						<div className="user__name text-center">
							{this.state.userData.name}
						</div>
						<div className="user__map text-center">
							<button onClick={() => this.onExpendAddClick()}>Address <FaAngleDown /></button>
							{this.state.isExpendAdd &&
								<div>
									{this.state.userData.address.suite},
									{this.state.userData.address.street},
									{this.state.userData.address.zipcode},
									{this.state.userData.address.city}
									<div>
										<a href={`https://www.google.com.hk/maps/@${this.state.userData.address.geo.lat},${this.state.userData.address.geo.lng},15z`} ><FaMapMarkerAlt /> Go to google map </a>
									</div>
								</div>
							}
						</div>

						<div className="border-b">
							<div className="row mt-3">
								<div className="col text-center">
									<button onClick={() => this.onTabClick('photo')} className={`nav__button ${this.state.activeTab === 'photo' ? 'active' : ''}`}>Photo</button>
								</div>
								<div className="col text-center">
									<button onClick={() => this.onTabClick('todos')} className={` nav__button ${this.state.activeTab === 'todos' ? 'active' : ''}`}>Todo&apos;s</button>
								</div>
								<div className="col text-center">
									<button onClick={() => this.onTabClick('post')} className={` nav__button ${this.state.activeTab === 'post' ? 'active' : ''}`}>Post</button>
								</div>
							</div>
						</div>

						{this.state.activeTab === 'photo' &&
							<PhotoAlbum activeUserId={this.props.activeUserId} />}
						{this.state.activeTab === 'todos' &&
							<Todos activeUserId={this.props.activeUserId} />}
						{this.state.activeTab === 'post' &&
							<Posts activeUserId={this.props.activeUserId} />}
					</div>
				}
			</div>
		);
	}

}

UserProfile.propTypes = {
	activeUserId: PropTypes.number
};

export default UserProfile;
