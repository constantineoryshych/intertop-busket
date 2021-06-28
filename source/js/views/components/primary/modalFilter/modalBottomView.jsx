import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class ModalBottomView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productListSize",
					fields: ["size"]
				}
			]
		};
		super(options);
	}

	applyPrimaryFilter() {
		this.props.history.push("/main");
	}

	filterReset() {
		this.props.stores.primaryModal.close();
	}

	render() {
		return (
			<div className="modal-filter-bottom">
				<div onClick={this.filterReset.bind(this)} className="close">
					<div />
					<div />
				</div>
				<div
					className="border-button-large"
					onClick={this.applyPrimaryFilter.bind(this)}
				>
					<p>
						{this.props.lang.button.apply}
					</p>
				</div>
				<div className="filtered-product-counter">
					{this.props.lang.hint["filtered-product-counter"]}
					<h3>
						{this.state.size}
					</h3>
				</div>
			</div>
		);
	}
}

export default ModalBottomView;
