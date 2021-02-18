const React = require('react');

const ItemDeleteButton = require('../buttons/item/item-delete-button');
const ItemGradeInput = require('../inputs/item/item-grade-input');
const ItemNameInput = require('../inputs/item/item-name-input');

const CaretButton = require('../buttons/caret-button');

class ItemPanel extends React.Component 
{
	constructor (props) {
		super(props);

		this.self = React.createRef();

		this.state = {
			name: this.props.name || '',
			grade: this.props.grade || 0,
			enable: true,
			toggle: this.props.toggle || false,
		};

		this.index = this.props.index;
		this.categoryPanel = this.props.categoryPanel;
	}

	componentDidMount () {
		// Append this component to the items list
		this.categoryPanel.setState({
			itemPanels: [...this.categoryPanel.state.itemPanels, this]
		});
	}

	updateOverallGrades () {
		this.categoryPanel.updateOverallGrades();
	}

	/**
	 * Delete an item at a given index
	 * @return void
	 */
	delete () {
		this.setState({
			enable: false
		});

		let panels = this.categoryPanel.state.itemPanels;
		panels.splice(this.index, 1);

		// Delete the item at the index
		this.categoryPanel.setState({
			itemPanels: panels
		});
	}

	/**
	 * Toggle item
	 * @return void
	 */
	toggle () {
		this.setState({
			toggle: !this.state.toggle
		});
	}

	/**
	 * Render the DOM
	 * @return string DOM
	 */
	render () {

		if (!this.state.enable) {
			return '';
		}

		return (
			<div className="container custom-container item-panel">
				<CaretButton parent={this} />
				<ItemDeleteButton itemPanel={this} />
				<div className={'fields ' + ((this.state.toggle) ? 'slideUp' : '')}>
					<ItemNameInput itemPanel={this} />			
					<ItemGradeInput itemPanel={this} />
				</div>
			</div>
		);
	}
}

module.exports = ItemPanel;