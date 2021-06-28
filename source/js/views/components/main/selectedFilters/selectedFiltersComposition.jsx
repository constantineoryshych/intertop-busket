import { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import FilterItemSelectedView from "./filterItemSelectedView.jsx";

class SelectedFiltersComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "selectedFilters"
				}
			]
		};
		super(options);
	}

	render() {
		const param = {
			className: "catalog-current-filter",
			perPage: "5",
			orientation: "horizontal",
			list: _.keys(this.props.stores.selectedFilters.getStore),
			items: FilterItemSelectedView,
			itemsParam: {
				stores: this.props.stores,
				lang: this.props.lang
			}
		};

		return createElement(ListSlider, param);
	}
}

export default SelectedFiltersComposition;
