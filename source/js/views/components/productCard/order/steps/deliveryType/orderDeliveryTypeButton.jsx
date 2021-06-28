import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class OrderDeliveryTypeButton extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderDeliveryType",
					fields: ["type"]
				}
			]
		};
		super(options);
	}

	getClass() {
		return this.state.type === this.props.type ? "active" : "";
	}

	chooseOrderType() {
		this.props.stores.orderDeliveryType.set({ type: this.props.type });
	}

	render() {
		// return this.props.type === 'store' ? this.ifDisable() : this.ifWork();
		return this.ifWork();
	}

	// ifDisable() {
	// 	return (
	// 		<div className="button disable" data-delivery-type={this.props.type}>
	// 			<p>
	// 				{this.props.lang.button["order-type-" + this.props.type]}
	// 			</p>
	// 			<p>(Незабаром)</p>
	// 		</div>
	// 	);
	// }

	ifWork() {
		return createElement(
			"div",
			{
				className: `button ${this.getClass()}`,
				"data-delivery-type": this.props.type,
				onClick: this.chooseOrderType.bind(this)
			},
			createElement(
				"p",
				null,
				this.props.lang.button[`order-type-${this.props.type}`]
			)
		);
	}
}

export default OrderDeliveryTypeButton;
