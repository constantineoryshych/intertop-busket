import React, { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import PreviewComposition from "./previewWrapper/previewComposition.jsx";
import SizeComposition from "./sizeWrapper/sizeComposition.jsx";
import PriceComposition from "./priceWrapper/priceComposition.jsx";


class InfoComposition extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "infoComposition" });

		this.params = {
			lang: this.props.lang,
			stores: this.props.stores
		};
	}

	getInfoTitle() {
		return (
			<h1>
				{`${this.state.item.BRAND || ``} ${this.state.item.VID_TOVARA_UA || ``} ${this
					.state.item.GENDER_UA || ``}`}
				<br />
				{`Модель ${this.state.item.SALE}`}
			</h1>
		);
	}

	getInfoBonus() {
		const bonus = Math.round((this.state.item.PRICE_ACTION * 0.03).toFixed(2));
		return (
			<div className="bonus">
				<div className="icon bonus-icon" />
				<p>
					<span>
						{isNaN(bonus) ? `3%` : bonus}
					</span>
					{` ${isNaN(bonus) ? `від ціни, у якості` : ``} ${this.props.lang.text["card-bonus"]}`}
				</p>
			</div>
		);
	}

	getInfoWrapper() {
		return (
			<div className="info-wrapper">
				{this.getInfoTitle()}
				{createElement(SizeComposition, this.params)}
				{createElement(PriceComposition, this.params)}
				{this.getInfoBonus()}
			</div>
		);
	}

	render() {
		return (
			<div className="wrapper" data-type="info">
				{createElement(PreviewComposition, this.params)}
				{this.getInfoWrapper()}
			</div>
		);
	}
}

export default InfoComposition;
