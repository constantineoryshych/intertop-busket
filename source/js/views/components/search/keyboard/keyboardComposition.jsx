import { Component, createElement } from "react";
import _ from "lodash";
import Letters from "@/keyboards.json";
import KeyboardButton from "./keyboardButton.jsx";

class KeyboardComposition extends Component {
	getButtons() {
		return _.map(Letters.search, el =>
			createElement(KeyboardButton, {
				key: el,
				button: el,
				stores: this.props.stores,
				history: this.props.history
			})
		);
	}

	render() {
		return createElement("div", { className: "keyboard" }, this.getButtons());
	}
}

export default KeyboardComposition;
