import React, { createElement } from "react";
import includes from "lodash/includes";
import { ComponentStateStore } from "redux-store-controller";
import InfoComposition from "./info/infoComposition.jsx";
import OrderComposition from "./order/orderComposition.jsx";
import ThankComposition from "./thank/thankComposition.jsx";
import NotFoundView from "./notFoundView.jsx";

class ProductCardComposition extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "productCardComposition" });
	}

	getBackButton() {
		return this.getButton({
			className: "reverse",
			onClick: this.backButton.bind(this)
		});
	}

	getCloseButton() {
		return this.getButton({
			className: "close",
			onClick: this.close.bind(this)
		});
	}

	// eslint-disable-next-line
	getButton(params) {
		return createElement("div", params, <div />, <div />);
	}

	cardType() {
		switch (this.state.type) {
			case "info":
				return this.getComposition(InfoComposition);
			case "order":
				return this.getComposition(OrderComposition);
			case "thank":
				return this.getComposition(ThankComposition);
			case "notFound":
			default:
				return this.getComposition(NotFoundView);
		}
	}

	getComposition(component) {
		const params = {
			stores: this.props.stores,
			lang: this.props.lang.Text
		};

		return createElement(component, params);
	}

	close() {
		this.props.history.push(this.props.history.location.pathname);
	}

	backButton() {
		this.props.stores.productCardType.set({ type: "info" });
	}

	render() {
		return (
			<section data-type="productCard">
				{this.getCloseButton()}
				{includes(["order", "thank"], this.state.type)
					? this.getBackButton()
					: false}
				{this.cardType()}
			</section>
		);
	}
}

export default ProductCardComposition;
