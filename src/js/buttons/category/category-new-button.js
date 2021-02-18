const React = require('react');
const CategoryPanel = require('../../panels/category-panel');

class CategoryNewButton extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			current: this.props.current || 0,
			total: this.props.total || 0
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick () {
		// Show category name input and new item button
		this.setState({total: this.state.total + 1});
	}

	render () {
		let categoryPanels = [];

		for (var i = this.state.current; i < this.state.total; i++) {
			categoryPanels.push(<CategoryPanel subjectPanel={this.props.subjectPanel} key={i} index={i} />)	
		}

		return (
			<div className="container custom-container">
				<button ref={this.self} onClick={this.onClick} className="btn btn-primary">New Category</button>
				{ categoryPanels }
			</div>
		);
	}
}

module.exports = CategoryNewButton;



