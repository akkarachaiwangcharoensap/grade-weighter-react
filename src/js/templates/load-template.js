const React = require('react');
const _ = require('lodash');

const SubjectPanel = require('../panels/subject-panel');
const CategoryPanel = require('../panels/category-panel');
const ItemPanel = require('../panels/item-panel');

const SubjectNewButton = require('../buttons/subject/subject-new-button');

class LoadTemplate extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {};

		this.data = this.props.data;
	}

	/**
	 * Render the DOM
	 * @return string DOM
	 */
	render () {

		let subjectPanels = [];

		for (var i = 0; i < this.data.content.length; i++) {
			let subjectPanel = JSON.parse(this.data.content[i]);
			subjectPanels.push(<SubjectPanel data={ this.data } load={ subjectPanel } id={ subjectPanel.id } key={ i } index={ i }/>);
		}

		return (
			<div>
				<SubjectNewButton current={ subjectPanels.length } total={ subjectPanels.length } />
				{ subjectPanels }
			</div>
		);
	}
}

module.exports = LoadTemplate;