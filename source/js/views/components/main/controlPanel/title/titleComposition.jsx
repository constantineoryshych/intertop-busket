import React, { Component, createElement } from "react";
import TitleView from "./titleView.jsx";
import ViewedView from "./viewedView.jsx";

class TitleComposition extends Component {
	render() {
		const params = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return (
			<div className="catalog-title-wrap">
				{createElement(TitleView, params)}
				{createElement(ViewedView, params)}
			</div>
		);
	}
}

export default TitleComposition;
