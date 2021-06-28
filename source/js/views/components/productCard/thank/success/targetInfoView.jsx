import { Component, createElement } from "react";
import StoreItemView from "~/views/components/common/storeItemView.jsx";

class TargetInfoView extends Component {
	getTitle() {
		const type = this.props.stores.orderType.getStore.type;
		const text = this.props.lang.title[`order-address-${type}`];
		return createElement("h2", null, text);
	}

	getInner() {
		const store = this.props.stores.orderStore.getStore.store;
		const param = { data: store, stores: this.props.stores };

		const comp = [this.getTitle(), createElement(StoreItemView, param)];
		return createElement("div", null, comp[0], comp[1]);
	}

	render() {
		const deliveryType = this.props.stores.orderDeliveryType.getStore.type;
		return deliveryType === "address" ? false : this.getInner();
	}
}

export default TargetInfoView;
