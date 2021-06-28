import { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import RouteList from "./routeList";
//import Product from "../../ts/busket/ts/action/product.ts";
import test from "../../../source/ts/maine.ts";
test();

class IndexView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "indexView" });
	}

	render() {
		return this.getRoute();
	}

	getRoute() {
		const component = RouteList[this.state.viewport].child;

		return createElement(component, {
			stores: this.props.stores,
			lang: this.props.lang.Text,
			session: this.props.session,
			history: this.props.history
		});
	}
}

export default IndexView;
