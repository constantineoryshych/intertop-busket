import React from "react";
import Config from "@/config.json";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class HomeButtonView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "viewport",
					fields: ["viewport"]
				}
			]
		};
		super(options);
	}

	goHome() {
		this.props.history.push("/primary");
		this.props.stores.search.reset();
	}

	iconSize() { //eslint-disable-line
		return Config.orientation.screen === "hori" ? "small" : "large";
	}

	getInner() {
		return (
			<div className="home-button" onClick={this.goHome.bind(this)}>
				<img src={`build/style/img/icons/home-${this.iconSize()}.png`} alt="" />
			</div>
		);
	}

	render() {
		return this.state.viewport === "/primary" ? false : this.getInner();
	}
}

export default HomeButtonView;
