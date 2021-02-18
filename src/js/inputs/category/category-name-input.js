const React = require('react');

class CategoryNameInput extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();
		this.categoryPanel = this.props.categoryPanel;

		this.onInput = this.onInput.bind(this);
	}

	onInput (e) {

		let input = e.target.value;
		
		this.categoryPanel.setState({name: input});
	}


	render() {
		return (
			<input type="text" ref={this.self} onInput={this.onInput} className="form-control" placeholder="Category Name"/>
		);
	}
}

module.exports = CategoryNameInput;