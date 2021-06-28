import React, { createElement } from 'react';
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

import PreviewProductComposition from './preview/previewProductComposition.jsx';
// import PreviewTarget from './preview/previewTarget.jsx';

import OrderDeliveryType from './steps/deliveryType/orderDeliveryType.jsx';
import OrderTargetComposition from './steps/target/orderTargetComposition.jsx';
import OrderPhoneComposition from './steps/phone/orderPhoneComposition.jsx';

class OrderComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderStep",
					fields: ["step"]
				}
			]
		};
		super(options);
	}

	orderStep(){
		const params = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		switch (this.state.step){
			case 1:
				return createElement(OrderDeliveryType, params);
			case 2:
				return createElement(OrderTargetComposition, params);
			case 3:
				return createElement(OrderPhoneComposition, params);
			default: return false;
		}
	}

	render(){
		return (
			<div className="wrapper" data-type="order">
				<div className="upper">
					<PreviewProductComposition stores={this.props.stores} lang={this.props.lang} />
					{/* <PreviewTarget store={this.props.store} lang={this.props.lang} /> */}
				</div>

				<div className="lower">
					{this.orderStep()}
				</div>

				{/* <div className="map"></div> */}
			</div>)
	}
}

export default OrderComposition;