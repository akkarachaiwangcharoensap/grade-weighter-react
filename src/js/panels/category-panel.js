const React = require('react');
const _ = require('lodash');

const CategoryDeleteButton = require('../buttons/category/category-delete-button');
const CategoryNameInput = require('../inputs/category/category-name-input');
const CategoryGradeInput = require('../inputs/category/category-grade-input');
const ItemNewButton = require('../buttons/item/item-new-button');
const ItemPanel = require('./item-panel');

class CategoryPanel extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			name: 'Category Name',
			grade: {
				current: 0,
				weight: 0,
			},
			enable: true,
			itemPanels: []
		};

		this.index = this.props.index;
		this.subjectPanel = this.props.subjectPanel;

		// Saved json string.
		this.load = this.props.load;
	}

	componentDidMount () {
		// Append this component to the list
		this.subjectPanel.setState({
			categoryPanels: [...this.subjectPanel.state.categoryPanels, this]
		});
	}

	updateOverallGrades () {
		let length = this.state.itemPanels.length;

		let sum = _.sumBy(this.state.itemPanels, function (itemPanel) {
			return itemPanel.state.grade;
		});

		let conversion = ((sum / length) * this.state.grade.weight) / 100;

		// 80% of 10% = 8%
		// ((80 + 50 / 2) * 10) / 100 = current
		// 80 * 10 / 100

		this.setState({
			grade: {
				...this.state.grade,
				current: conversion
			}
		});

		this.subjectPanel.updateOverallGrades();
	}

	/**
	 * Delete an item at a given index
	 * @return void
	 */
	delete () {
		this.setState({
			enable: false
		});

		let panels = this.subjectPanel.state.categoryPanels;
		panels.splice(this.index, 1);

		// Delete the item at the index
		this.subjectPanel.setState({
			categoryPanels: panels
		});
	}

	render() {

		if (!this.state.enable) {
			return '';
		}

		let itemPanels = [];

		// Determine if we are initializing from the saved json.
		if (this.load) {
			for (var i = 0; i < this.load.itemPanels.length; i++)
			{
				let itemPanel = this.load.itemPanels[i];
				itemPanels.push(<ItemPanel 
					categoryPanel={this} 
					load={itemPanel} 
					name={itemPanel.name} 
					grade={itemPanel.grade} 
					toggle={itemPanel.toggle} 
					index={i}
					key={i} 
					/>
				);
			}
		}

		return (
			<div className="container custom-container" ref={ this.self }>
				<h4>{this.state.name} - { this.state.grade.weight }% - Overall: { this.state.grade.current.toFixed(1) }%</h4>
				<CategoryDeleteButton categoryPanel={ this }/>
				<CategoryNameInput categoryPanel={ this }/>	
				<CategoryGradeInput categoryPanel={ this }/>			
				<ItemNewButton categoryPanel={ this } current={ itemPanels.length } total={ itemPanels.length }/>
				
				{ itemPanels }
			</div>
		);
	}
}

module.exports = CategoryPanel;


