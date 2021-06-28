import { Component, createElement } from "react";
import InputView from "./inputView.jsx";
import ValidatePhoneView from "./validatePhoneViews.jsx";

class PhoneAreaComposition extends Component {
	getTitle() {
		return createElement("h1", null, this.props.lang.title["order-phone"]);
	}

	getInput() {
		return createElement(InputView, {
			inputType: "phone",
			stores: this.props.stores,
			subscribe: {
				store: "orderPhoneParsed",
				fields: ["number"]
			}
		});
	}

	getWarning() {
		return createElement(ValidatePhoneView, {
			stores: this.props.stores,
			lang: this.props.lang
		});
	}

	getText() {
		return createElement("p", null, this.props.lang.text["order-phone"]);
	}

	render() {
		return createElement(
			"div",
			{ className: "number-block" },
			this.getTitle(),
			this.getInput(),
			this.getWarning(),
			this.getText()
		);
	}
}

export default PhoneAreaComposition;
