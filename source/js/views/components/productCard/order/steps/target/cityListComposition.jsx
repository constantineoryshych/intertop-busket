import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import CityItemView from "~/views/components/common/cityItemView.jsx";

class CityListComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderCities",
					fields: ["list"]
				}
			]
		};
		super(options);
	}

	render() {
		const param = {
			perPage: "5",
			orientation: "horizontal",
			className: "city-wrapper",
			list: _.uniq(_.map(this.state.list, el => el.substring(3, 5))),
			items: CityItemView,
			itemsParam: { stores: this.props.stores }
		};

		return (
			<div className="city-list">
				<h1>
					{this.props.lang.title["choice-city"]}
				</h1>
				{createElement(ListSlider, param)}
			</div>
		);
	}
}

export default CityListComposition;
