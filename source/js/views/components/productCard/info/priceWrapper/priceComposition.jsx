import React, { createElement } from "react";
import map from "lodash/map";
import size from "lodash/size";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import BuyButtonView from "./buyButtonView.jsx";

class PriceComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productCardState",
					fields: ["item", "spec"]
				}
			]
		};
		super(options);
	}

	getPrice() {
		if (this.state.spec || size(this.state.item.PRICE_ACTION) < 1) return <p>Ціна вказана на товарі</p>;
		let price = this.state.item.PRICE_ACTION.slice(0, -3);
		price = [price.slice(0, -3), price.substring(price.length - 3)];
		return (
			<div className="price">
				<h4>
					{`${price[0]} ${price[1]}`}
				</h4>
				<div>
					<p>00</p>
					<p>
						{this.props.lang.currency}
					</p>
				</div>
			</div>
		);
	}

	getDiscount() {
		if (this.state.spec || size(this.state.item.PRICE_ACTION) < 1) return false;
		if (this.state.item.PRICE_ACTION !== this.state.item.PRICE_BASE) {
			let discount = this.state.item.PRICE_BASE.slice(0, -3);
			discount = [
				discount.slice(0, -3),
				discount.substring(discount.length - 3)
			];
			return (
				<div className="discount">
					<hr />
					<p>
						{`${discount[0]} ${discount[1]}`}
					</p>
					<div />
				</div>
			);
		}
		return false;
	}

	render() {
		return (
			<div className="price-wrapper">
				<div className="price-left">
					<h3>
						{this.props.lang.title["card-price"]}
					</h3>

					<div>
						{this.getPrice()}
						{this.getDiscount()}
					</div>
				</div>

				<div className="price-right">
					{map(["delivery", "reserve"], el =>
						createElement(BuyButtonView, {
							key: el,
							type: el,
							stores: this.props.stores,
							lang: this.props.lang
						})
					)}
				</div>
			</div>
		);
	}
}

export default PriceComposition;
