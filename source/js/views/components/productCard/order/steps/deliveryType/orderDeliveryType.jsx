import React, { Component, createElement } from "react";
import _ from "lodash";
import OrderDeliveryTypeButton from "./orderDeliveryTypeButton.jsx";

class OrderDeliveryType extends Component {
	constructor(props) {
		super(props);

		this.types = ["store", "address"];

		this.state = {
			store: this.props.stores.availableOrder.getStore.pickUp,
			address: this.props.stores.availableOrder.getStore.delivery
		};
	}

	getButtons() {
		return _.map(this.types, el => this.isAviable(el));
	}

	isAviable(t) {
		return this.state[t] === true ? this.getButton(t) : "";
	}

	getButton(t) {
		return createElement(OrderDeliveryTypeButton, {
			key: t,
			type: t,
			stores: this.props.stores,
			lang: this.props.lang
		});
	}

	render() {
		return (
			<div data-type="type">
				<h1>
					{this.props.lang.title["order-type"]}
				</h1>
				<div className="button-wrapper">
					{this.getButtons()}
				</div>
			</div>
		);
	}
}

export default OrderDeliveryType;
