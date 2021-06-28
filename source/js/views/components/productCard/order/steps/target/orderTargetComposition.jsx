import { Component, createElement } from "react";
import CityListComposition from "./cityListComposition.jsx";
import StoreListComposition from "./storeListComposition.jsx";
import ConfirmButtonView from "./../confirmButtonView.jsx";

class OrderTargetComposition extends Component {
	render() {
		const param = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return createElement(
			"div",
			{
				"data-type": "target"
			},
			createElement(CityListComposition, param),
			createElement(StoreListComposition, param),
			createElement(ConfirmButtonView, param)
		);
	}
}

export default OrderTargetComposition;
