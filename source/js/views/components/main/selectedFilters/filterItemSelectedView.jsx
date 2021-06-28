import { Component, createElement } from "react";
import _ from "lodash";

class FilterItemSelectedView extends Component {
	detach(item) {
		const data = {};
		data[this.props.data] = [item];
		this.props.stores.catalogEvent.set({
			type: "detach",
			value: data
		});
	}

	getItems() {
		const categoryItems = this.props.stores.selectedFilters.getStore[
			this.props.data
		];

		return _.map(categoryItems, item =>
			createElement(
				"div",
				{
					key: item,
					className: "filter-item",
					"data-filter-item": item,
					onClick: () => this.detach(item)
				},
				createElement("p", null, item),
				createElement("div", { className: "icon close-small-grey" })
			)
		);
	}

	render() {
		return createElement(
			"div",
			{
				className: "filter-category inline-hori",
				"data-filter-category": this.props.data
			},
			createElement("h2", null, `${this.props.lang.filters[this.props.data]}:`),
			this.getItems()
		);
	}
}

export default FilterItemSelectedView;
