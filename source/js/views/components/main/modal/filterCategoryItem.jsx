import { createElement } from "react";
import ComponentStateStore from "../../common/componentStateStore.jsx";

class FilterCategoryItem extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "mainModal",
					fields: ["currentCategory"]
				}
			]
		};
		super(options);
	}

	isActiveClass() {
		return this.state.currentCategory === this.props.data ? "active" : "";
	}

	changeCatagory() {
		this.props.stores.mainModal.set({
			open: true,
			currentCategory: this.props.data
		});
	}

	render() {
		return createElement(
			"div",
			{
				"data-filter-item": this.props.data,
				onClick: this.changeCatagory.bind(this),
				className: this.isActiveClass()
			},
			createElement("p", null, this.props.lang.filters[this.props.data])
		);
	}
}

export default FilterCategoryItem;
