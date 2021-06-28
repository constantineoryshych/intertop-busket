import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import SortListItemView from "./sortListItemView.jsx";

class SortListComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productSort",
					fields: ["sort", "open"]
				}
			]
		};
		super(options);

		this.methods = ["recom", "asc", "desc"];
	}

	toogleList() {
		this.props.stores.productSort.set({
			sort: this.state.sort,
			open: this.state.open === false
		});
	}

	isOpen() {
		return this.state.open ? "" : "hide";
	}

	getList() {
		return _.map(this.methods, (el, i) =>
			createElement(SortListItemView, {
				key: i,
				method: el,
				stores: this.props.stores,
				lang: this.props.lang
			})
		);
	}

	render() {
		return (
			<div className="wrap">
				{createElement(
					"div",
					{
						className: "current icon sort-close",
						onClick: this.toogleList.bind(this)
					},
					createElement("p", null, this.props.lang.sort[this.state.sort])
				)}

				{createElement(
					"div",
					{
						className: `sort-list icon sort-open ${this.isOpen()}`
					},
					this.getList()
				)}
			</div>
		);
	}
}

export default SortListComposition;
