import React, { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import Config from "@/config.json";
import CityDecode from "@/cityDecode.json";

class InfoBlockComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "infoBlock",
					fields: ["slide"]
				}
			]
		};
		super(options);
	}

	getInner(){
		return (
			<div className="location-wrapper">
				<p>{CityDecode[Config.loc.cityLocation].name}</p>
				<div className="infoRender">
					{createElement(this.state.slide, { stores: this.props.stores })}
				</div>
			</div>
		);
	}

	render() {
		return typeof this.state.slide === "function" ? this.getInner() : false;
	}
}

export default InfoBlockComposition;
