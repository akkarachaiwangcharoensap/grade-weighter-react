const React = require('react');
const _ = require('lodash');

const ItemPanel = require('../../panels/item-panel');

class ItemNewButton extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			current: this.props.current || 0,
			total: this.props.total || 0,		
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick () {
		// Show category name input and new item button
		this.setState({
			total: this.state.total + 1
		});
	}

	render () {
		let itemPanels = [];

		for (var i = this.state.current; i < this.state.total; i++) {
			itemPanels.push(<ItemPanel categoryPanel={this.props.categoryPanel} index={i} key={i}/>);
		}

		return (
			<div>
				<button ref={this.self} onClick={this.onClick} className="btn btn-primary">New Item</button>
				{ itemPanels }
			</div>
		);
	}
}

module.exports = ItemNewButton;





