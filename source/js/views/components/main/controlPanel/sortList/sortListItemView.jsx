import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class SortListItemView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productSort",
					fields: ["sort"]
				}
			]
		};
		super(options);
	}

	isActive() {
		return this.state.sort === this.props.method ? "active" : "";
	}

	selectSortMethod() {
		this.props.stores.productSort.set({ sort: this.props.method, open: false });
	}

	render() {
		return createElement(
			"div",
			{
				"data-sort-type": this.props.method,
				className: this.isActive(),
				onClick: this.selectSortMethod.bind(this)
			},
			createElement("p", null, this.props.lang.sort[this.props.method])
		);
	}
}

export default SortListItemView;
