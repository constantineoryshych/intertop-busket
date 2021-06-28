import { Component, createElement } from "react";

class OrderCodeView extends Component {
	render() {
		return createElement(
			"div",
			null,
			createElement("h2", null, this.props.lang.title["order-code"]),
			createElement("h1", null, this.props.stores.orderCode.getStore.code)
		);
	}
}

export default OrderCodeView;
