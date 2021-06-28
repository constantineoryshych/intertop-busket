import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import { BrandParser } from "~/services/parsers";

class TitleView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "primaryModal",
					fields: ["modalType", "title"]
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

	render() {
		return this.state.modalType === "category"
			? this.getCategory()
			: this.getBrand();
	}
}
export default TitleView;
