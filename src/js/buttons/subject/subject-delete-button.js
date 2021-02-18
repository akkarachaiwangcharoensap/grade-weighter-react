const React = require('react');
const _ = require('lodash');

const ItemPanel = require('../../panels/item-panel');

class SubjectDeleteButton extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
		}

		this.index = this.props.index;
		this.subjectPanel = this.props.subjectPanel;

		this.onClick = this.onClick.bind(this);
	}

	onClick () {
		this.subjectPanel.delete();
	}

	render () {

		return (
			<div>
				<button ref={this.self} onClick={this.onClick} className="btn btn-danger">
					<i className="fas fa-times"></i>
				</button>
			</div>
		);
	}
}

module.exports = SubjectDeleteButton;





