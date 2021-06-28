import { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import Banner from "~/views/components/common/banner.jsx";

class FooterView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "footerView" });
	}

	getBanner() {
		const params = {
			stores: this.props.stores,
			history: this.props.history,
			name: "footer"
		};

		return createElement(Banner, params);
	}

	render() {
		return this.state.open ? false : this.getBanner();
	}
}

export default FooterView;
