import { Component, createElement } from "react";

class PreviewProductItem extends Component {
	isModelFiledTitle() {
		return this.props.type === "model" ? this.props.model : "";
	}

	render() {
		const title = `${this.props.lang.title[
			`order-${this.props.type}`
		]} ${this.isModelFiledTitle()}`;

		return createElement(
			"div",
			{
				"data-info": this.props.type
			},
			createElement("h1", null, title),
			createElement("p", null, this.props.data)
		);
	}
}

export default PreviewProductItem;
