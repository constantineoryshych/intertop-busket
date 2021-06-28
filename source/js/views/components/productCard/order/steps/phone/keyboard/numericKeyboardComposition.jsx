import { Component, createElement } from "react";
import _ from "lodash";
import Letters from "@/keyboards.json";
import KeyboardButton from "./keyboardButton.jsx";

class NumericKeyboardComposition extends Component {
	getButtons() {
		return _.map(Letters.numeric, el =>
			createElement(KeyboardButton, {
				key: el,
				button: el,
				stores: this.props.stores
			})
		);
	}

	render() {
		return createElement(
			"div",
			{ className: "phone-keyboard" },
			this.getButtons()
		);
	}
}

export default NumericKeyboardComposition;
