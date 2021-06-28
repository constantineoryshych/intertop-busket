import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import SizeItemView from "./sizeItemView.jsx";
import SizeAccessoryView from "./sizeAccessoryView.jsx";

class SizeTableComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productCardState",
					fields: ["item"]
				},
				{
					store: "restsData",
					fields: ["parsed", "err"]
				},
				{
					store: "restsTab",
					fields: ["tab"]
				}
			]
		};
		super(options);
	}

	getSizeTable() {
		return null == this.state.err
			? null == this.state.parsed
				? false
				: this.state.item.SIZE.includes(null)
					? this.getAccessory()
					: this.getTable()
			: createElement("p", null, this.state.err);
	}

	getAccessory() {
		return createElement(SizeAccessoryView, {
			stores: this.props.stores,
			lang: this.props.lang,
			classNames: this.state.parsed.NS
		});
	}

	getTable() {
		return _.map(this.state.item.SIZE, val =>
			createElement(SizeItemView, {
				key: val,
				size: val,
				classNames: this.state.parsed[val],
				stores: this.props.stores
			})
		);
	}

	isAccessory() {
		return this.state.item.SIZE.includes(null) ? "accessory" : "";
	}

	getLoader() {
		const wrap = createElement(
			"div",
			{ className: "size-loader" },
			<img src="./build/style/img/icons/loader.gif" alt="" />
		);

		return this.state.parsed == null && this.state.err == null ? wrap : false;
	}

	render() {
		const params = {
			className: `size-table ${this.isAccessory()}`,
			"data-place": this.state.tab
		};

		return (
			<span>
				{this.getLoader()}
				{createElement("div", params, this.getSizeTable())}
			</span>
		);
	}
}

export default SizeTableComposition;
