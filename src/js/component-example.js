const React = require('react');

class ComponentExample extends React.Component 
{
	constructor (props) {
		super(props);

		this.state = {
			message: null
		};

		this.message = '';

		this.handleClick = this.handleClick.bind(this);
		this.onInput = this.onInput.bind(this);
	}

	render () {
		return (
			<div>
				<h1>{ this.state.message }</h1>
				<input type="text" onInput={ this.onInput }/>
				<button onClick={ this.handleClick }>Click</button>
			</div>
		);
	}

	setMessage (message)
	{
		this.setState({
			message: message
		});
	}

	handleClick (e)
	{
		this.setMessage(this.message);
	}

	onInput (e) 
	{
		this.message = e.target.value;
	}
}

module.exports = ComponentExample;






