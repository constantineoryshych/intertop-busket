import { Component, createElement } from "react";

class NotFoundView extends Component {
	getTitle() {
		return createElement("h1", null, this.props.lang.title["not-found"]);
	}

	getDescription() {
		const text = this.props.lang.text["not-found"];
		return createElement("h2", { className: "d-lb" }, text);
	}

	render() {
		const param = {
			className: "wrapper",
			"data-type": "not-found"
		};

		return createElement("div", param, this.getTitle(), this.getDescription());
	}
}

export default NotFoundView;
