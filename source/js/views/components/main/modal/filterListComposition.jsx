import React, { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import CategoryComposition from "./categoryComposition.jsx";
import ItemsComposition from "./itemsComposition.jsx";

class FilterListComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "mainModal",
					fields: ["open"]
				}
			]
		};
		super(options);
	}

	render() {
		const params = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return this.state.open === false
			? false
			: <div className="catalog-filter-wrapper">
					<h1 />

					{createElement(CategoryComposition, params)}
					{createElement(ItemsComposition, params)}

					<div className="filter-bottom">
						<div className="close">
							<img src="" alt="" />
						</div>
						<div className="button">
							<p />
						</div>
						<div className="filtered-product-counter">
							<p />
							<h2 />
						</div>
					</div>
				</div>;
	}
}

export default FilterListComposition;
