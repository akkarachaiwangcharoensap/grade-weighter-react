const React = require('react');
const MathJS = require('mathjs');

class ItemGradeInput extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();
		// this.itemPanel = this.props.itemPanel;

		this.state = {
			itemPanel: this.props.itemPanel
		};
		
		this.itemPanel = this.state.itemPanel;

		this.onChange = this.onChange.bind(this);
	}

	onChange (e) {
		let input = e.target.value;

		let regex = new RegExp(/(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/g);
		// Check if it is in correct expression.
		
		if (!regex.test(input)) {

			this.setState({ grade: 0 });

			return;
		}

		this.itemPanel.setState({
			grade: MathJS.evaluate(input) * 100
		});

		_.delay(() => {
			// Update the category overall grade.
			this.itemPanel.updateOverallGrades();
		}, 500);

	}

	render() {
		return (
			<input type="text" onChange={this.onChange} ref={this.self} className="form-control" placeholder="Grade"/>
		);
	}
}

module.exports = ItemGradeInput;