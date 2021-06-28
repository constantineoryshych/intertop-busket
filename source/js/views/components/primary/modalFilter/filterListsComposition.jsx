import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import FilterITem from "~/views/components/common/filterItem.jsx";

class FilterListsComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "availableFilters",
					fields: ["BRAND", "VID_TOVARA_UA", "SEASON_UA", "GENDER_UA", "SIZE", "CLOZES"]
				}
			]
		};
		super(options);

		// Категории фильтров модального окна
		this.drawList = {
			female: ["BRAND", "VID_TOVARA_UA", "SIZE"],
			male: ["BRAND", "VID_TOVARA_UA", "SIZE"],
			kids: ["BRAND", "VID_TOVARA_UA", "SIZE"],
			accessory: ["BRAND", "VID_TOVARA_UA", "GENDER_UA"],
			care: ["BRAND", "VID_TOVARA_UA", "GENDER_UA"],
			brand: ["GENDER_UA", "SEASON_UA", "VID_TOVARA_UA"],
			clothes: ["BRAND", "VID_TOVARA_UA", "GENDER_UA"]
		};
	}

	listComponent() {
		const listParam = {
			className: "list-slider-wrapper",
			perPage: "4",
			orientation: "horizontal",
			items: FilterITem
		};

		const title =
			typeof this.drawList[this.props.stores.primaryModal.getStore.title] ===
			"undefined"
				? "brand"
				: this.props.stores.primaryModal.getStore.title;

		const available = _.pick(this.state, this.drawList[title]);

		return _.map(available, (el, cat) => {
			_.assign(listParam, {
				key: cat,
				filterCategory: cat,
				list: el,
				itemsParam: { stores: this.props.stores, category: cat }
			});

			return createElement(ListSlider, listParam, null);
		});
	}

	render() {
		if (this.state == null) return false;
		return (
			<div className="filter-list-wrap">
				{this.listComponent()}
			</div>
		);
	}
}

export default FilterListsComposition;
