import React, { Component, createElement } from "react";
import _ from "lodash";
import CategoryMenuItemView from "./categoryMenuItemView.jsx";

class CategoryMenuComposition extends Component {
	constructor(props) {
		super(props);
		this.items = ["female", "male", "kids", "accessory", "care", "clothes"];
	}

	getItems() {
		return _.map(this.items, (el, index) =>
			createElement(CategoryMenuItemView, {
				key: index,
				item: el,
				stores: this.props.stores,
				lang: this.props.lang
			})
		);
	}

	render() {
		return (
			<div className="category-wrapper">
				<h1>
					{this.props.lang.title["home-category"]}
				</h1>
				<div className="list">
					{this.getItems()}
				</div>
			</div>
		);
	}
}

export default CategoryMenuComposition;
