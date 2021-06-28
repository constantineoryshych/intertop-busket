import React from "react";
import { ComponentStateStore } from "redux-store-controller";

class ViewedView extends ComponentStateStore {
	constructor(propsData) {
		super({ props: propsData, name: "viewedView" });
	}

	render() {
		return (
			<div className="catalog-view-count">
				<div className="icon eye" />
				<p>
					переглянуто <span>{this.state.cnt}</span> товарів з{" "}
					<span>{this.state.size}</span>
				</p>
			</div>
		);
	}
}

export default ViewedView;
