import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class SellerNameView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "sellerName",
					fields: ["name"]
				}
			]
		};
		super(options);
	}

	getInner() {
		return createElement(
			"div",
			{ className: "seller-name" },
			createElement("p", null, this.state.name)
		);
	}

	render() {
		return this.state.name == null ? false : this.getInner();
	}
}

export default SellerNameView;
