import React, { Component, createElement } from "react";
import ListSlider from "~/views/components/common/listSlider.jsx";
import BrandListItem from "./brandListItemView.jsx";

class BrandMenuComposition extends Component {
	getList() {
		return this.props.stores.availableFilters.getStore.BRAND;
	}

	render() {
		const listParam = {
			className: "list-slider-wrapper",
			perPage: "8",
			orientation: "vertical",
			list: this.getList(),
			items: BrandListItem,
			itemsParam: { stores: this.props.stores }
		};

		return (
			<div className="brand-wrapper">
				<h1>
					{this.props.lang.title["home-brand"]}
				</h1>
				{createElement(ListSlider, listParam, null)}
			</div>
		);
	}
}

export default BrandMenuComposition;
