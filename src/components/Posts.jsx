import React, {PropTypes, Component} from 'react';
import fetch from 'node-fetch';

import Modal from 'react-modal';
import {FaEnvelope, FaTimes} from 'react-icons/fa';

import _find from 'lodash/find';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.onPostClick = this.onPostClick.bind(this);
		this.onCloseModalClick = this.onCloseModalClick.bind(this);

		this.state = {
			posts: null,
			modalIsOpen: false,
			postId: null,
			comments: null
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

	onCloseModalClick() {
		this.setState({
			modalIsOpen: false,
			postId: null
		})
	}

	onPostClick(postId) {
		fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					comments: json,
					modalIsOpen: true,
					postId
				})
			)
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

	getPreview(body) {
		const previewBody = body.split(' ').slice(0, 8).join(' ');
		return previewBody
	}

	render() {
		return (
			<div className="p-3">
				{this.state.posts && this.state.posts.map((post) =>
					<div className="pb-2" key={post.id}>
						<button onClick={() => this.onPostClick(post.id)} className="text-left btn-block">
							<div className="card">
								<div className="card-body">
									<div><h2 className="h6">{post.title}</h2></div>
									<div>{this.getPreview(post.body)}...</div>
									<div className="pt-2">View Deatil ＞</div>
								</div>
							</div>
						</button>
					</div>
				)}
				{this.state.modalIsOpen &&
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						contentLabel="Example Modal"
						ariaHideApp={false}
					>
						<div className="border-b">
							<h1>{_find(this.state.posts, ['id', this.state.postId]).title}</h1>
							<p>{_find(this.state.posts, ['id', this.state.postId]).body}</p>
						</div>
						<div>
							<p className="h4">Comments</p>
							{this.state.comments ? this.state.comments.map((comment, i) =>
								<div className="pb-3" key={comment.id}>
									<div>#{i + 1} {comment.name} <a href={`mailto:${comment.email}`}><FaEnvelope style={{color: '#b7b7b7'}} /></a></div>
									<div>{comment.body}</div>
								</div>
							) : <p>No Comments...</p>}
						</div>
						<button onClick={this.onCloseModalClick} className="btn--close"><FaTimes size="1.5em" /></button>
					</Modal>
				}
			</div>
		);
	}
}

Posts.propTypes = {
	activeUserId: PropTypes.number
};

export default Posts;
