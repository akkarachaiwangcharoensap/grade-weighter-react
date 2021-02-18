const React = require('react');

class SubjectNameInput extends React.Component 
{
	constructor (props) {
		super(props);

		this.state = {
			name: this.props.name || ''
		};

		this.self = React.createRef();

		this.onInput = this.onInput.bind(this);
	}

	onInput (e) {
		let input = e.target.value;

		this.setState({
			name: e.target.value
		});
	}

	render () {
		return (
			<input type="text" ref={this.self} onInput={this.onInput} className="form-control" placeholder="Subject Name" value={this.state.name}/>
		);
	}
}

module.exports = SubjectNameInput;