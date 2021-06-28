import React, { Component, createElement } from "react";
import DescriptionView from "./descriptionView.jsx";
import OrdeCodeView from "./orderCodeView.jsx";
import TargetInfoView from "./targetInfoView.jsx";

class ThankSuccessComposition extends Component {
	render() {
		const param = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return (
			<div className="wrapper" data-type="thank">
				{createElement("h1", null, this.props.lang.title["order-thank"])}
				{createElement(DescriptionView, param)}
				<div>
					{createElement(OrdeCodeView, param)}
					{createElement(TargetInfoView, param)}
				</div>
			</div>
		);
	}
}

export default ThankSuccessComposition;
