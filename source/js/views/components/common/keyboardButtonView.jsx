import { Component, createElement } from "react";

class KeyboardButtonView extends Component {
	clickHandler(event) {  //eslint-disable-line
		// ...
	}

	getClass() {
		return this.getContext();
	}

	getContext() {
		return this.props.button;
	}

	render() {
		return createElement(
			"div",
			{
				className: `button phone-buttons ${this.getClass()}`,
				"data-paste": this.props.button,
				onClick: this.props.onClick || this.clickHandler.bind(this)
			},
			createElement("p", null, this.getContext())
		);
	}
}

export default KeyboardButtonView;
