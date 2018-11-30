import React, {PropTypes, Component} from 'react';
import fetch from 'node-fetch';

class SinglePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: null
		};
	}

	componentDidMount() {
		this.getUserPosts();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeUserId !== this.props.activeUserId) {
			this.getUserPosts();
		}
	}

	getUserPosts() {
		fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.activeUserId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					posts: json
				})
			)
	}

	render() {
		return (
			<div className="">
				{this.state.posts && this.state.posts.map((post) =>
					<div className="pb-2" key={post.id}>
						{post.title}
						<div>{post.body}</div>
					</div>
				)}
			</div>
		);
	}
}

SinglePost.propTypes = {
	activeUserId: PropTypes.number
};

export default SinglePost;
