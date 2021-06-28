import React, { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import DetailComposition from "~/views/components/productCard/info/detailWrapper/detailComposition.jsx";
import BrandView from "~/views/components/common/brandView";
import ListSlider from "~/views/components/common/listSlider.jsx";
import ThumbnailComposition from "./thumbnail/thumbnailComposition.jsx";
import PreviewSlideView from "./previewSlideView.jsx";

class PreviewComposition extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "previewComposition" });
	}

	getPreview() {
		const param = {
			className: "preview",
			perPage: 1,
			orientation: "horizontal",
			list: [this.state.slide],
			items: PreviewSlideView,
			itemsParam: { stores: this.props.stores }
		};

		return typeof this.state.slide === "number"
			? createElement(ListSlider, param)
			: <DetailComposition stores={this.props.stores} lang={this.props.lang} />;
	}

	getBrand() {
		return createElement(BrandView, { name: this.state.item.BRAND });
	}

	normal() {
		return (
			<div className="preview-wrapper">
				{this.voblerAdd()}
				<div className="logo-wrap">
					{this.getBrand()}
				</div>

				{this.getPreview()}

				<ThumbnailComposition
					stores={this.props.stores}
					lang={this.props.lang}
				/>
			</div>
		);
	}

	voblerAdd(){
		const PRICE_ACTION =  this.state.item.PRICE_ACTION;
		const PRICE_BASE   =  this.state.item.PRICE_BASE;
		const wisionPropsProcent  =  Math.round(((PRICE_BASE - PRICE_ACTION) / PRICE_BASE * 100));
        
		const ONLY_ONLINE_VOBLER = (this.state.item.ONLY_ONLINE !== "0" && this.state.item.ONLY_ONLINE !== "false"
		&& this.state.item.ONLY_ONLINE !== null) ? <p className="vobOnlineExclusiveCard">Online exclusive</p> : "";
		const VOBLER_PROCENT = (wisionPropsProcent >= 10 ) ? 
		<div className="vobProcentCard"><p>{"-" + wisionPropsProcent + "%"}</p></div> : "";
		return [VOBLER_PROCENT, ONLY_ONLINE_VOBLER];
	}

	// eslint-disable-next-line
	special() {
		return (
			<div className="preview-wrapper">
				<div className="special-good">
					<img src="./build/style/img/icons/no-image.png" />
				</div>
			</div>
		);
	}

	render() {
		return this.props.stores.productCardState.getStore.spec
			? this.special()
			: this.normal();
	}
}

export default PreviewComposition;
