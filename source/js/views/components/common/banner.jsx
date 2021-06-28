import { Component, createElement } from "react";
import Config from "@/config.json";
import Banners from "@/banners.json";

class Banner extends Component {
	clickHandler() {
		this.props.stores.catalogEvent.set({
			type: "preset",
			value: Banners.sales[this.props.name].preset
		});

		this.props.stores.primaryModal.set({
			type: "category",
			title: Banners.sales[this.props.name].preset
		});

		this.props.history.push("/main");
	}

	isClickable(){
		return Banners.sales[this.props.name].preset == null;
	}

	getImageName(){
		const orientation = Config.orientation.screen;
		return Banners.sales[this.props.name][orientation][0];
	}

	render(){
		return createElement("div",
			{
				onClick: this.isClickable() ? false : this.clickHandler.bind(this)
			},
			   createElement("img", {
			   	src: `build/img/sales/${this.getImageName()}.jpg`
			   })
			)
	}
}

export default Banner;