import React, { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ThankSuccessComposition from "./success/thankSuccessComposition.jsx";
import ThankWaitView from "./thankWaitView.jsx";
import ThankErrorView from "./thankErrorView.jsx";

class ThankComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderSend",
					fields: ["status", "error"]
				}
			]
		};
		super(options);
	}

	render() {
		const param = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		switch (this.state.status) {
			case "ready":
				return createElement(ThankWaitView, param);
			case "done":
				return this.state.error == null
					? createElement(ThankSuccessComposition, param)
					: createElement(ThankErrorView, param);
			default:
				return createElement(ThankErrorView, param);
		}
	}
}

export default ThankComposition;
