const React = require('react');
const _ = require('lodash');

class CaretButton extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			toggle: this.props.toggle || false,
		}

		this.onClick = this.onClick.bind(this);

		this.parent = this.props.parent;
	}

	onClick () {
		this.setState({
			toggle: !this.state.toggle
		});

		this.parent.toggle();
	}

	render () {
		return (
			<div>
				<button ref={this.self} onClick={this.onClick} className='btn btn-success'>
					<i className={'fas fa-caret-down custom-caret ' + (this.state.toggle ? 'active' : '') }></i>
				</button>
			</div>
		);
	}
}

module.exports = CaretButton;





