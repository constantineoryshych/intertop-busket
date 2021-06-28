import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class FilterModalControlView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "mainModal",
					fields: ["open"]
				}
			]
		};
		super(options);
	}

	modalFilterToggle() {
		const data = this.state.open
			? { open: false, currentCategory: "VID_TOVARA_UA" }
			: { open: true, currentCategory: "VID_TOVARA_UA" };
		this.props.stores.mainModal.set(data);
	}

	resetFilter() {
		if (_.size(this.props.stores.selectedFilters.getStore) < 1) return;
		this.props.stores.catalogEvent.set({ type: "reset", value: null });
	}

	getOpenButton() {
		return createElement(
			"div",
			{
				className: "button-filter border-button-medium",
				"data-filter": "open",
				onClick: this.modalFilterToggle.bind(this)
			},
			createElement("p", null, this.props.lang.button["catalog-filter-open"])
		);
	}

	getCancelButton() {
		const inner = [
			createElement(
				"div",
				{ key: 0, className: "close-medium" },
				<div className="icon close-small-light" />
			),
			createElement(
				"p",
				{ key: 1 },
				this.props.lang.button["catalog-filter-cancel"]
			)
		];

		return createElement(
			"div",
			{
				className: "button-filter",
				"data-filter": "cancel",
				onClick: this.resetFilter.bind(this)
			},
			_.map(inner)
		);
	}

	render() {
		return (
			<div className="catalog-filter-control">
				{this.getOpenButton()}
				{this.getCancelButton()}
			</div>
		);
	}
}

export default FilterModalControlView;
