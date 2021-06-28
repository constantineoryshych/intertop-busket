import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class BuyButtonView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "availableOrder",
					fields: [propsData.type]
				}
			]
		};
		super(options);
	}

	isActive() {
		return this.state[this.props.type] ? "active" : "";
	}

	orderView() {
		if (this.state[this.props.type] === false) return;
		this.props.stores.productCardType.set({ type: "order" });

		this.props.stores.orderType.set({ type: this.props.type });
	}

	render() {
		return (
			<div
				className={`button ${this.isActive()}`}
				data-type={this.props.type}
				onClick={this.orderView.bind(this)}
			>
				<p>
					{this.props.lang.button[this.props.type]}
				</p>
			</div>
		);
	}
}

export default BuyButtonView;
