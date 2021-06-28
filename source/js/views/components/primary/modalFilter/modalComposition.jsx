import React, { createElement } from "react";
import Config from "@/config.json";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ModalTitleView from "./modalTitleView.jsx";
import FilterListsComposition from "./filterListsComposition.jsx";
import ModalBottomView from "./modalBottomView.jsx";

class ModalComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "primaryModal",
					fields: ["open", "modalType"]
				}
			]
		};
		super(options);
	}

	getClass() {
		switch (this.state.modalType) {
			case "brand":
				return this.state.open ? "slideInLeft" : "slideOutLeft";
			default:
				return this.state.open ? "slideInRight" : "slideOutRight";
		}
	}

	headerModal(){
		return (Config.orientation.screen === "hori") ? <h1>{this.props.lang.title["home-modal-filter"]}</h1> : null
	}

	render() {
		return (
			<div className={`modal ${this.state.modalType}`}>
				{Config.orientation.screen === "hori"
					? false
					: createElement(ModalTitleView, this.props)}
				<div className={`modal-filter animated ${this.getClass()}`}>
					{this.headerModal()}
					<FilterListsComposition
						stores={this.props.stores}
						lang={this.props.lang}
					/>
					<ModalBottomView stores={this.props.stores} lang={this.props.lang} history={this.props.history} />
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		this.props.stores.primaryModal.close();
	}
}

export default ModalComposition;
