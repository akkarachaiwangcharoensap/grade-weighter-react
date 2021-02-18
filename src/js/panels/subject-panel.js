const React = require('react');

const SubjectDeleteButton = require('../buttons/subject/subject-delete-button');
const SubjectNameInput = require('../inputs/subject/subject-name-input');
const CategoryNewButton = require('../buttons/category/category-new-button');
const CategoryPanel = require('./category-panel');

class SubjectPanel extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			id: this.props.id || 0,
			name: '',
			grade: {
				current: 0
			},
			enable: true,
			categoryPanels: []
		};

		this.index = this.props.index;
		this.data = this.props.data;

		// Saved JSON string.
		this.load = this.props.load;
	}

	toJson () {
		
		let categoryPanels =_.map(this.state.categoryPanels, (categoryPanel) => {

			var itemPanels = _.map(categoryPanel.state.itemPanels, (itemPanel) => {
				return {
					name: itemPanel.state.name,
					grade: itemPanel.state.grade,
					toggle: itemPanel.state.toggle
				}
			});

			return {
				name: categoryPanel.state.name,
				grade: categoryPanel.state.grade,
				itemPanels: itemPanels
			};
		});

		return JSON.stringify({
			id: this.state.id,
			name: this.state.name,
			grade: this.state.grade.current,
			categoryPanels: categoryPanels
		});
	}

	componentDidMount () {

		// Append data
		window.app.content = [...window.app.content, this];
		console.log(this.state.id);
	}

	updateOverallGrades () {
		let length = this.state.categoryPanels.length;

		let gradeSum = 0, weightSum = 0;
		_.each(this.state.categoryPanels, function (categoryPanel) {
			gradeSum = gradeSum + categoryPanel.state.grade.current;
			weightSum = weightSum + categoryPanel.state.grade.weight;
		});

		let conversion = ((gradeSum / length) * 100) / 100;

		// a = 100% - weight%, a > 0
		// a + ((sum / length) * 100) / 100
		let startingWeight = 100; // 100%

		let total = (startingWeight - weightSum) + conversion;

		this.setState({
			grade: {
				...this.state.grade,
				current: total
			}
		});
	}

	delete () {
		this.setState({
			enable: false
		});

		// Delete the subject panel at the index
		window.app.content.splice(this.index, 1);
	}

	render () {

		if (!this.state.enable) {
			return '';
		}

		let categoryPanels = [];

		// Determine if we are initializing from the saved json.		
		if (this.load) {
			for (var i = 0; i < this.load.categoryPanels.length; i++)
			{
				let categoryPanel = this.load.categoryPanels[i];
				categoryPanels.push(<CategoryPanel subjectPanel={this} load={categoryPanel} key={i} index={i} />);
			}
		}

		return (
			
			<div className="container custom-container">
			
				<h4>Overall: { this.state.grade.current.toFixed(1) }%</h4>
				<SubjectDeleteButton subjectPanel={ this }/>
				<SubjectNameInput subjectPanel={ this } name={ this.props.name }/>			
				<CategoryNewButton subjectPanel={ this } current={ categoryPanels.length } total={ categoryPanels.length }/>

				{ categoryPanels }
			</div>
		);
	}
}

module.exports = SubjectPanel;