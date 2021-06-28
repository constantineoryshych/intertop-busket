import React, { Component, createElement } from "react";
import _ from "lodash";
import Config from "@/config.json";
import TitleComposition from "./title/titleComposition.jsx";
import FilterModalControlView from "./filterModalControlView.jsx";
import GridButtonView from "./gridButtonView.jsx";
import SortListComposition from "./sortList/sortListComposition.jsx";

class ControlPanelComposition extends Component {
	getGridButtons() {
		if (Config.orientation.screen === "vert") return false;
		return (
			<div className="catalog-grid-control">
				{_.map([3, 10], (val, i) =>
					createElement(GridButtonView, {
						key: i,
						grid: val,
						stores: this.props.stores
					})
				)}
			</div>
		);
	}

	render() {
		return (
			<div className="catalog-header">
				{createElement(TitleComposition, {
					stores: this.props.stores,
					lang: this.props.lang
				})}

				{/* <div className="catalog-banner" /> */}

				{createElement(FilterModalControlView, {
					stores: this.props.stores,
					lang: this.props.lang
				})}

				{this.getGridButtons()}

				<div className="catalog-sort-wrap">
					{createElement(SortListComposition, {
						stores: this.props.stores,
						lang: this.props.lang
					})}
				</div>
			</div>
		);
	}
}

export default ControlPanelComposition;
