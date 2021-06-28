import React, { Component, createElement } from "react";
import PhoneAreaComposition from "./phoneAreaComposition.jsx";
import SellerAreaComposition from "./sellerAreaComposition.jsx";
import NumericKeyboardComposition from "./keyboard/numericKeyboardComposition.jsx";
import ConfirmButtonView from "./../confirmButtonView.jsx";

class OrderPhoneComposition extends Component {
	render() {
		const param = {
			stores: this.props.stores,
			lang: this.props.lang
		};

		return (
			<div data-type="phone">
				<div className="phone-area">
					{createElement(PhoneAreaComposition, param)}
					{createElement(SellerAreaComposition, param)}
					{createElement(NumericKeyboardComposition, param)}
				</div>
				{createElement(ConfirmButtonView, param)}
			</div>
		);
	}
}

export default OrderPhoneComposition;
