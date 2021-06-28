import React, { Component, createElement } from "react";
import _ from "lodash";
import TabButtonView from "./tabButtonView.jsx";
import SizeTableComposition from "./sizeTableComposition.jsx";

class SizeComposition extends Component {
	getTitle() {
		return (
			<h2>
				{this.props.lang.title["card-size"]}
			</h2>
		);
	}

	getTabs() {
		return _.map(["store", "chain"], val =>
			createElement(TabButtonView, {
				stores: this.props.stores,
				lang: this.props.lang,
				value: val,
				key: val
			})
		);
	}

	getTable() {
		return createElement(SizeTableComposition, {
			stores: this.props.stores,
			lang: this.props.lang
		});
	}

	// getSizeStandarts(){
	// 	return (
	// 		{/*<div className="size-calculator">*/}
	// 		{/*<div className="size-calc-title">*/}
	// 		{/*<p>*/}
	// 		{/*{this.props.lang.title["card-size-calculator"]}*/}
	// 		{/*</p>*/}
	// 		{/*</div>*/}
	// 		{/*<div data-size-standart="" className="button active" />*/}
	// 		{/*<div data-size-standart="" className="button" />*/}
	// 		{/*<div data-size-standart="" className="button" />*/}
	// 		{/*<div data-size-standart="" className="button" />*/}
	// 		{/*</div>*/}
	// 	)
	// }

	render() {
		return (
			<div className="size-wrapper">
				{this.getTitle()}
				<div className="size-place">
					{this.getTabs()}
				</div>
				{this.getTable()}
			</div>
		);
	}
}

export default SizeComposition;
