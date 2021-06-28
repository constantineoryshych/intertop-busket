import React, { Component, createElement } from "react";

class ThankWaitView extends Component {
	render() {
		return (
			<div className="wrapper" data-type="thank">
				{createElement("h1", null, this.props.lang.title["order-thank"])}
				{createElement("p", null, this.props.lang.text["order-thank-wait"])}
				{createElement("img", {src: "./build/style/img/icons/loader.gif"})}
			</div>
		);
	}
}

export default ThankWaitView;
