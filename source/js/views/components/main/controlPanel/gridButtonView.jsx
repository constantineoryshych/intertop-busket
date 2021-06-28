import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class GridButtonView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "mainViewGrid",
					fields: ["grid"]
				}
			]
		};
		super(options);
		this.init();
	}

	changeGrid() {
		this.props.stores.mainViewGrid.set({ grid: this.props.grid });
	}

	isGridButtonActive() {
		return this.state.grid === this.props.grid ? "active" : "";
	}

	init(){
    	this.props.stores.mainViewGrid.set({ grid: 10 });
    }

	render() {
		return createElement(
			"div",
			{
				className: `simple-button ${this.isGridButtonActive()}`,
				onClick: this.changeGrid.bind(this),
				"data-grid": this.props.grid
			},
			createElement("div", {
				className: `icon grid-${this.props.grid}${this.isGridButtonActive()}`
			})
		);
	}
}

export default GridButtonView;
