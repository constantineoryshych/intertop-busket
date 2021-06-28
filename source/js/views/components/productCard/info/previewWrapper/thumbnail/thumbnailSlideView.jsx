import React, { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import Config from "@/config.json";

class ThumbnailSlideView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "thumbnailSlideView" });

		this.host = `http://${Config.network.host}:${Config.network.port}${Config
			.network.path.catalogImg}`;
	}

	getClass() {
		return this.props.data === this.state.slide ? "active" : "";
	}

	goToSlide() {
		if (this.props.data === this.state.slide) return;
		this.props.stores.previewSliderView.set({ slide: this.props.data });
	}

	render() {
		return (
			<div className={this.getClass()} onClick={this.goToSlide.bind(this)}>
				{createElement("img", {
					ref: "thumbnail",
					src: `${this.host}${this.state.key}_${this.props.data}.jpg`,
					onError: this.defaultSrc.bind(this)
				})}
			</div>
		);
	}

	resize() {
		const value =
			this.refs.thumbnail.height > this.refs.thumbnail.width
				? "height: 100%;"
				: "width: 100%;";

		this.refs.thumbnail.setAttribute("style", value);
	}

	componentDidMount() {
		this.refs.thumbnail.onload = this.resize.bind(this);
	}

	componentDidUpdate() {
		this.refs.thumbnail.onload = this.resize.bind(this);
	}

	defaultSrc() {
		this.refs.thumbnail.setAttribute(
			"src",
			"./build/style/img/icons/no-image.png"
		);
	}
}

export default ThumbnailSlideView;
