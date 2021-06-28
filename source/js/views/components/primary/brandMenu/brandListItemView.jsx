import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import { BrandParser } from "~/services/parsers";

class BrandListItemView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "primaryModal",
					fields: ["open"]
				}
			]
		};
		super(options);
		this.state = { active: false };
	}

	getNewState(store) {
		const newState = this.props.stores[store].getStore;
		if (newState.open === false && this.state.active === true)
			this.setState({ active: false });
	}

	getFragment() {
		const path = this.state.active
			? "./build/img/brand/white/"
			: "./build/img/brand/black/";
		return <img src={`${path}${BrandParser(this.props.data)}.png`} />;
	}

	chooseBrand() {
		this.props.stores.primaryModal.open({
			type: "brand",
			title: this.props.data
		});

		this.props.stores.catalogEvent.set({
			type: "append",
			value: { BRAND: [this.props.data] }
		});
	}

	resetBrand() {
		this.props.stores.primaryModal.close();
	}

	toogleClick() {
		if (this.state.active) this.resetBrand();
		else this.chooseBrand();
		this.setState({ active: this.state.active === false });
	}

	getClass() {
		return this.state.active ? "rel" : "";
	}

	render() {
		return (
			<div
				className={this.getClass()}
				data-filter-item={BrandParser(this.props.data)}
				onClick={this.toogleClick.bind(this)}
			>
				{this.getFragment()}
			</div>
		);
	}
}

export default BrandListItemView;
