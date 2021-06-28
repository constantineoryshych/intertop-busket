import React, { Component, createElement } from "react";

class ThankErrorView extends Component {
	render() {
		return (
			<div className="wrapper" data-type="thank">
				{createElement("h1", null, this.props.lang.title["order-thank-error"])}
				{/* {createElement("p", { className: "d-lb" }, this.props.lang.text["order-thank-error"])} */}
				{createElement("p", null, "Сталася помилка під час відправлення вашего замовлення.")}
				{createElement("p", null, this.props.stores.orderSend.getStore.error)}
				{createElement("h3", null, this.props.lang.text["loader-contact"])}
			</div>
		);
	}
}

export default ThankErrorView;
