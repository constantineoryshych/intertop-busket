import { Component, createElement } from "react";

class DescriptionView extends Component {
	render() {
		const text = this.props.lang.text["order-delivery"].address;
		return createElement("p", { className: "d-lb" }, text);
	}
}

export default DescriptionView;
