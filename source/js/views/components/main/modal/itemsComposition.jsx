import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import FilterItem from "~/views/components/common/filterItem.jsx";

class ItemsComposition extends ComponentStateStore {
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

	render() {
		const param = {
			className: "filter-item-wrap",
			perPage: "5",
			orientation: "horizontal",
			filterCategory: this.state.currentCategory,
			list: this.props.stores.availableFilters.getStore[
				this.state.currentCategory
			],
			items: FilterItem,
			itemsParam: {
				stores: this.props.stores,
				lang: this.props.lang,
				category: this.state.currentCategory
			}
		};

		return createElement(ListSlider, param);
	}
}

export default ItemsComposition;
