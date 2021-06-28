import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import { BrandParser } from "~/services/parsers";

class ModalTitleView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "primaryModal",
					fields: ["modalType", "title", "open"]
				}
			]
		};
		super(options);
	}

	getCategory() {
		return (
			<h1>
				{this.props.lang.category[this.state.title]}
			</h1>
		);
	}

	getBrand() {
		return (
			<img
				src={`./build/img/brand/black/${BrandParser(this.state.title)}.png`}
			/>
		);
	}

	getClass() {
		switch (this.state.modalType) {
			case "category":
				return this.state.open ? "slideInLeft" : "slideOutLeft";
			default:
				return this.state.open ? "slideInRight" : "slideOutRight";
		}
	}

	render() {
		return (
			<div className={`modal-title animated ${this.getClass()}`}>
				{this.state.modalType === "category"
					? this.getCategory()
					: this.getBrand()}
			</div>
		);
	}
}
export default ModalTitleView;
