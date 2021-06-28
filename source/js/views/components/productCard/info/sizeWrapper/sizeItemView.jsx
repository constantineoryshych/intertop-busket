import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class SizeItemView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderSize",
					fields: ["size"]
				}
			]
		};
		super(options);
	}

	chooseSize() {
		this.props.stores.orderSize.set({ size: this.props.size })
		this.props.stores.orderSizeTarget.set({ rests: this.props.classNames.split(" ") })
	}

	getClass(){
		console.log(this.state.size, "this.state.size");
		console.log(this.state.size === this.props.size ? "rel" : "", "/**********************************************************/");
		return this.state.size === this.props.size ? "rel" : "";
	}

	render() {
		return (
			<div
				data-size={this.props.size}
				className={`${this.props.classNames} ${this.getClass()}`}
				onClick={this.chooseSize.bind(this)}
			>
				<p>
					{this.props.size}
				</p>
			</div>
		);
	}
}

export default SizeItemView;
