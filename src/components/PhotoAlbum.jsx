import React, {PropTypes, Component} from 'react';
import Lightbox from 'react-image-lightbox';
import LazyLoadImg from 'react-lazyload-img';
import fetch from 'node-fetch';

import BackArrow from '../components/BackArrow';

class PhotoAlbum extends Component {
	constructor(props) {
		super(props);

		this.onAlbumClick = this.onAlbumClick.bind(this);
		this.onBackToAlbumClick = this.onBackToAlbumClick.bind(this);

		this.state = {
			photoAlbum: null,
			albumId: null,
			photos: null,
			isLightboxOpen: false
		};
	}

	componentDidMount() {
		this.getUserAlbum();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeUserId !== this.props.activeUserId) {
			this.getUserAlbum();
		}
	}

	onAlbumClick(albumId) {
		fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					albumId,
					photos: json
				})
			)
	}

	onImgClick(index) {
		this.setState({
			isLightboxOpen: true,
			currentImgIndex: index
		})
	}

	onBackToAlbumClick() {
		this.setState({
			albumId: null,
			photos: null
		})
	}

	getUserAlbum() {
		fetch(`https://jsonplaceholder.typicode.com/albums?userId=${this.props.activeUserId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					photoAlbum: json
				})
			)
	}

	getPhoto(id) {
		fetch(`https://jsonplaceholder.typicode.com/photos?id=${id}`)
			.then(response => response.json())
			.then(data => {
				console.log(data[0].thumbnailUrl)
				return (data[0].thumbnailUrl)
			})
	}


	render() {
		return (
			<div className="p-3">
				<div className="card-columns">
					{this.state.photoAlbum && !this.state.albumId && this.state.photoAlbum.map((album) =>
						<div className="card" key={album.id}>
							<button onClick={() => this.onAlbumClick(album.id)} className="text-left">
								<span className="small">#{album.id}</span> {album.title}
							</button>
						</div>
					)}
				</div>
				{this.state.albumId &&
					<div className="row">
						<div className="col-12" >
							<BackArrow handleBackClick={this.onBackToAlbumClick} />
						</div>
						{this.state.photos ? this.state.photos.map((photo, i) =>
							<div className="col-4" key={photo.id} >
								<button onClick={() => this.onImgClick(i)}>
									<LazyLoadImg
										src={photo.thumbnailUrl}
										placeholder="img/placeholder.png"
										className="w-100"
										alt={photo.title}
									/>
								</button>
							</div>
						) : <p>Loading...</p>}
					</div>
				}
				{this.state.isLightboxOpen &&
					<Lightbox
						mainSrc={this.state.photos[this.state.currentImgIndex].url}
						nextSrc={this.state.currentImgIndex !== (this.state.photos.length - 1) ? this.state.photos[this.state.currentImgIndex + 1].url : ''}
						prevSrc={this.state.currentImgIndex !== 0 ? this.state.photos[this.state.currentImgIndex - 1].url : ''}
						onCloseRequest={() => this.setState({isLightboxOpen: false})}
						onMovePrevRequest={() => this.setState({currentImgIndex: this.state.currentImgIndex - 1})}
						onMoveNextRequest={() => this.setState({currentImgIndex: this.state.currentImgIndex + 1})}
					/>
				}
			</div>
		)
	}
}

PhotoAlbum.propTypes = {
	activeUserId: PropTypes.number
};

export default PhotoAlbum;
