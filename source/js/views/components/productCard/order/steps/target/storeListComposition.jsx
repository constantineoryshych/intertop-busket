import React, { createElement } from "react";
import _ from "lodash";
import ListSlider from "~/views/components/common/listSlider.jsx";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import StoreItemView from "~/views/components/common/storeItemView.jsx";

class StoreListComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderCities",
					fields: ["list"]
				},
				{
					store: "orderCity",
					fields: ["city"]
				}
			]
		};
		super(options);
	}

	render() {
		const param = {
			perPage: "3",
			orientation: "horizontal",
			className: "store-wrapper",
			list: _.uniq(
				_.filter(this.state.list, el => el.substring(3, 5) === this.state.city)
			),
			items: StoreItemView,
			itemsParam: { stores: this.props.stores }
		};

		return (
			<div className="store-list">
				<h1>
					{this.props.lang.title["choice-store"]}
				</h1>
				{createElement(ListSlider, param)}
			</div>
		);
	}
}

export default StoreListComposition;
