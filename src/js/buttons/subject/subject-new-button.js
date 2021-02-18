const React = require('react');
const SubjectPanel = require('../../panels/subject-panel');

class SubjectNewButton extends React.Component 
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
		// Show new subject input and new category button
		this.setState({total: this.state.total + 1});
	}

	render () {
		let subjectPanels = [];

		for (var i = this.state.current; i < this.state.total; i++) {
			subjectPanels.push(<SubjectPanel data={this.props.data} subjectPanel={ this } id={i} key={i} index={i} />)	
		}

		return (
			<div>
				<button ref={this.self} onClick={this.onClick} className="btn btn-primary">New Subject</button>
				{ subjectPanels }
			</div>
		);
	}
}

module.exports = SubjectNewButton;