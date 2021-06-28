import React, { Component, createElement } from "react";
import assign from "lodash/assign";
import Config from "@/config.json";
import ControlPanelComposition from "./controlPanel/controlPanelComposition.jsx";
import SelectedFiltersComposition from "./selectedFilters/selectedFiltersComposition.jsx";
import ProductListComposition from "./productListComposition.jsx";
import FilterListComposition from "./modal/filterListComposition.jsx";
import FooterView from "./footerView.jsx";

class MainComposition extends Component {
	isBanner() {
		if (Config.orientation.screen === "hori") return false;
		return createElement(FooterView, {
			stores: this.props.stores,
			history: this.props.history
		});
	}

	render() {
		const params = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return (
			<section data-type="catalog">
				{createElement(ControlPanelComposition, params)}
				{createElement(SelectedFiltersComposition, params)}
				{createElement(FilterListComposition, params)}
				{createElement(
					ProductListComposition,
					assign({ history: this.props.history }, params)
				)}
				{this.isBanner()}
			</section>
		);
	}
}

export default MainComposition;
