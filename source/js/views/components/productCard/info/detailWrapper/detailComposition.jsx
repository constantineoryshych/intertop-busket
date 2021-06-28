import { createElement } from "react";
import _ from "lodash";
import { ComponentStateStore } from "redux-store-controller";
import Config from "@/config";
//console.log()

class DetailComposition extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "detailComposition" });
	}

	getField(field) {
		return this.state.item[`${field}_UA`] == null
			? false
			: this.fieldComponent(field);
	}

	fieldComponent(field) {
		return createElement(
			"p",
			{ key: field },
			createElement("span", null, this.props.lang.filters[`${field}_UA`]),
			`: ${this.state.item[`${field}_UA`]}`
		);
	}

	getDiscription() {
		return this.state.item.DESCRIPTION_UA == null
			? false
			: createElement("h5", null, this.state.item.DESCRIPTION_UA);
	}

	render() {
		return createElement(
			"div",
			{ className: "info" },
			_.map(Config.views.productCard.infoDetailFields, el => this.getField(el)),
			this.getDiscription()
		);
	}
}

export default DetailComposition;
