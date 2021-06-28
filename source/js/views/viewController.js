import { createElement } from "react";
import { render } from "react-dom";

import HeaderComposition from "./components/header/headerComposition.jsx";
import IndexView from "./indexView.jsx";

class ViewController {
	constructor(options) {
		render(
			createElement(
				"div",
				{ id: "wrapper" },
				createElement(HeaderComposition, options),
				createElement(IndexView, options)
			),
			document.getElementById("container")
		);
	}
}

export default ViewController;
