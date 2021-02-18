const React = require('react');
const _ = require('lodash');

class CategoryGradeInput extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();
		this.categoryPanel = this.props.categoryPanel;

		this.onInput = this.onInput.bind(this);
	}

	onInput (e) {
		let validate = (e.target.value) ? parseInt(e.target.value) || 0 : 0;
		let input = _.clamp(validate, 0, 100);

		this.categoryPanel.setState({ grade: {...this.categoryPanel.state.grade, weight: input}});

		_.delay(() => {
			// Update the category overall grade.
			this.categoryPanel.updateOverallGrades();
		}, 500);
	}

	render() {
		return (
			<input type="text" ref={this.self} onChange={this.onInput} className="form-control" placeholder="Grade Weight"/>
		);
	}
}

module.exports = CategoryGradeInput;