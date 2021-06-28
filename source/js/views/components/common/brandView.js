import { Component, createElement } from "react";
import { BrandParser } from "~/services/parsers";

class BrandView extends Component {
	render() {
		return createElement("img", {
			src: `./build/img/brand/origin/${this.parseName()}.png`,
			ref: "brandLogo",
			onError: this.defaultSrc.bind(this)
		});
	}

	parseName(){
		return BrandParser(this.props.name);
	}

	defaultSrc() {
		this.refs.brandLogo.setAttribute(
			"src",
			`./build/img/brand/default.png`
		);
	}
}

export default BrandView;
