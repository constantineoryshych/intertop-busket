import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import Config from "@/config.json";

class SearchInputView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "search",
					fields: ["value"]
				}
			]
		};
		super(options);

		this.stores = propsData.stores;
	}

	initSearchView() {
		if (this.props.history.location.pathname === "/search")
			this.props.stores.search.reset();
		else this.props.history.push("/search");
	}

	render() {
		return Config.orientation.screen === "hori"
			? this.getInput()
			: this.getLargeInput();
	}

	getInput() {
		return (
			<input
				type="text"
				className="inputStart"
				value={this.state.value || ""}
				onClick={this.initSearchView.bind(this)}
				readOnly={true}
				placeholder="Пошук"
			/>
		);
	}

	getLargeInput() {
		return (
			<div className="search-input-large">
				<div className="icon" />
				<div className="large-wrapper">
					{this.getInput()}
				</div>
			</div>
		);
	}
}

export default SearchInputView;
