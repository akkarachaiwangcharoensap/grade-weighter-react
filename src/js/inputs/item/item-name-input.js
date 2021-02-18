const React = require('react');

class ItemNameInput extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();
		this.itemPanel = this.props.itemPanel;

		this.onInput = this.onInput.bind(this);
	}

	onInput (e) {
		this.itemPanel.setState({ name: e.target.value });
	}

	render() {
		return (
			<input type="text" ref={this.self} onInput={ this.onInput } className="form-control" placeholder="Item Name"/>
		);
	}
}

module.exports = ItemNameInput;