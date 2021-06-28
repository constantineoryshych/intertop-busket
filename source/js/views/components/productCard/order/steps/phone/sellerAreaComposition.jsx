import { Component, createElement } from "react";
import InputView from "./inputView.jsx";
import SellerNameView from "./sellerNameView.jsx";

class SellerAreaComposition extends Component {
	getTitle() {
		return createElement("h1", null, this.props.lang.title["order-seller"]);
	}

	getInput() {
		return createElement(InputView, {
			inputType: "seller",
			stores: this.props.stores,
			subscribe: {
				store: "orderSeller",
				fields: ["number"]
			}
		});
	}

	getText() {
		return createElement("p", null, this.props.lang.text["order-seller"]);
	}

	render() {
		return createElement(
			"div",
			{ className: "consultant-area" },
			this.getTitle(),
			this.getInput(),
			this.getText(),
			createElement(SellerNameView, { stores: this.props.stores })
		);
	}
}

export default SellerAreaComposition;
