import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class TabButtonView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "restsTab",
					fields: ["tab"]
				}
			]
		};
		super(options);
	}

	toggleTab() {
		if (this.state.tab === this.props.value) return;
		this.props.stores.restsTab.set({ tab: this.props.value });
	}

	getClass() {
		return this.state.tab === this.props.value ? "active" : "";
	}

	render() {
		return (
			<div
				data-place={this.props.value}
				className={`button ${this.getClass()}`}
				onClick={this.toggleTab.bind(this)}
			>
				<p>
					{this.props.lang.button[`in-${this.props.value}`]}
				</p>
			</div>
		);
	}
}

export default TabButtonView;
