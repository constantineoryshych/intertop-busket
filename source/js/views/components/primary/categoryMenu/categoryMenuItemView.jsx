import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class CategoryMenuItemView extends ComponentStateStore {
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

	chooseCategory() {
		this.props.stores.catalogEvent.set({
			type: "preset",
			value: this.props.item
		});

		this.props.stores.primaryModal.open({
			type: "category",
			title: this.props.item
		});
	}

	resetCatagory() {
		this.props.stores.catalogEvent.set({ type: "reset" });
		this.props.stores.primaryModal.close();
	}

	toogleClick() {
		if (this.state.active) this.resetCatagory();
		else this.chooseCategory();

		this.setState({ active: this.state.active === false });
	}

	getClass() {
		return this.state.active ? "rel" : "";
	}

	render() {
		return (
			<div
				data-category={this.props.item}
				className={`button ${this.getClass()}`}
				onClick={this.toogleClick.bind(this)}
			>
				<p>
					{this.props.lang.category[this.props.item]}
				</p>
			</div>
		);
	}
}

export default CategoryMenuItemView;
