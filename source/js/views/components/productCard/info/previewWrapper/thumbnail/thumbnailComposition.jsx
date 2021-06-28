import React, { createElement } from "react";
import _ from 'lodash';
import Config from "@/config.json";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import ThumbnailSlideView from "./thumbnailSlideView.jsx";

class ThumbnailComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "previewSliderView",
					fields: ["slide"]
				}
			]
		};
		super(options);
	}

	goToslide() {
		const param = { slide: this.state.slide === "info" ? 1 : "info" };
		this.props.stores.previewSliderView.set(param);
	}

	getClass() {
		return this.state.slide === "info" ? "active" : "";
	}

	getSlider() {
		const paramThumbnail = {
			className: "list-wrapper",
			perPage: (Config.orientation.screen === 'vert') ? 3 : 4,
			orientation: "horizontal",
			list: this.getSliderList(),
			items: ThumbnailSlideView,
			itemsParam: { stores: this.props.stores }
		};

		return createElement(ListSlider, paramThumbnail);
	}

	getSliderList() {
		const images = this.props.stores.productCardState.getStore.item.PHOTO;

		return _.range(1, parseInt(images+1));
	}

	render() {
		return (
			<div className="preview-slider">
				{createElement(
					"div",
					{
						className: `product-info ${this.getClass()}`,
						onClick: this.goToslide.bind(this)
					},
					<p>
						{this.props.lang.button["product-info"]}
					</p>
				)}

				{this.getSlider()}
			</div>
		);
	}
}

export default ThumbnailComposition;
