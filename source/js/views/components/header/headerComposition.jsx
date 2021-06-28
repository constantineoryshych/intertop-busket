import React, { Component, createElement } from "react";
import Config from "@/config.json";
import InfoBlockComposition from "./infoBlock/infoBlockComposition.jsx";
import SearchInputView from "./searchInputView.jsx";
import HomeButtonView from "./homeButtonView.jsx";
import NonTouchView from "./nonTouchView.jsx";

class HeaderComposition extends Component {
	goHome() {
		if (this.props.history.location.pathname === "/primary") return;
		this.props.history.push("/primary");
	}

	render() {
		return (
			<header>
				<div className="logo" onClick={this.goHome.bind(this)}>
					<img src="build/img/logo.svg" alt="" />
				</div>
				<div className="search">
					{this.getHomeButton()}
					{this.getSerachBlock()}
				</div>
				{Config.orientation.screen === "vert" ? this.getNonTouch() : false}
				{this.getInfoBlock()}
			</header>
		);
	}

	getHomeButton() {
		return createElement(HomeButtonView, this.props);
	}

	getSerachBlock() {
		return createElement(SearchInputView, this.props);
	}

	getInfoBlock() {
		return createElement(InfoBlockComposition, this.props);
	}

	getNonTouch() {
		return createElement(NonTouchView, this.props);
	}
}

export default HeaderComposition;
