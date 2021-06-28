import { Component, createElement } from "react";
import _ from "lodash";
// import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import FilterCategoryItem from "./filterCategoryItem.jsx";

class CategoryComposition extends Component {
	render() {
		const ava = this.props.stores.availableFilters.getStore;
		const param = {
			className: "filter-category-wrap",
			perPage: "5",
			orientation: "horizontal",
			list: _.filter(
				_.difference(_.keys(ava), ["ACCESSORY"]),
				val => _.size(ava[val]) > 0
			),
			items: FilterCategoryItem,
			itemsParam: { stores: this.props.stores, lang: this.props.lang }
		};

		return createElement(ListSlider, param);
	}
}

export default CategoryComposition;
