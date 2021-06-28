import { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import Config from "@/config.json";

class PreviewSlideView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "previewSlideView" });

		this.host = `http://${Config.network.host}:${Config.network.port}${Config
			.network.path.catalogImg}`;
	}

	render() {
		return createElement("img", {
			ref: "slide",
			src: `${this.host}${this.state.key}_${this.state.slide}.jpg`,
			onError: this.defaultSrc.bind(this)
		});
	}

	didChanges() {
		this.refs.slide.onload = () => {
			const value =
				this.refs.slide.height > this.refs.slide.width
					? "height: 100%; width: auto"
					: "";

			this.refs.slide.setAttribute("style", value);
		};
	}

	componentDidMount() {
		this.didChanges();
	}

	componentDidUpdate() {
		this.didChanges();
	}

	defaultSrc() {
		this.refs.slide.setAttribute("src", "./build/style/img/icons/no-image.png");
	}
}

export default PreviewSlideView;
