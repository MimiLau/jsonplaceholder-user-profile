import React, {PropTypes, Component} from 'react';
import fetch from 'node-fetch';

import {FaRegCheckCircle} from 'react-icons/fa';

class Todos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: null
		};
	}

	componentDidMount() {
		this.getUserTodos();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeUserId !== this.props.activeUserId) {
			this.getUserTodos();
		}
	}

	getUserTodos() {
		fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.props.activeUserId}`)
			.then(response => response.json())
			.then(json =>
				this.setState({
					todos: json
				})
			)
	}

	render() {
		return (
			<div className="p-3">
				{this.state.todos && this.state.todos.map((todo) =>
					<div className="pb-2" key={todo.id}>
						<FaRegCheckCircle style={{color: todo.completed ? 'black' : '#b7b7b7'}} /> {todo.title}
					</div>
				)}
			</div>
		);
	}
}

Todos.propTypes = {
	activeUserId: PropTypes.number
};

export default Todos;
