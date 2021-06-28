import { createElement } from "react";
import Config from "@/config.json";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import ProductListItem from "~/views/components/common/productListItem.jsx";

class SearchResultComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "searchResult",
					fields: ["result"]
				}
			]
		};
		super(options);
	}

	render() {
		const param = {
			className: "catalog-item-wrapper",
			perPage: Config.orientation.screen === "vert" ? 9 : 5,
			orientation: "horizontal",
			list: this.state.result == null ? [] : this.state.result,
			items: ProductListItem,
			itemsParam: this.props
		};

		return createElement(ListSlider, param);
	}
}

export default SearchResultComposition;
