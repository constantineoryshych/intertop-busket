import React, { createElement } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import SaleArea from "./saleArea.jsx";
import CategoryMenuComposition from "./categoryMenu/categoryMenuComposition.jsx";
import BrandMenuComposition from "./brandMenu/brandMenuComposition.jsx";
import ModalComposition from "./modalFilter/modalComposition.jsx";

class PrimaryComposition extends ComponentStateStore {
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

	render() {
		return (
			<section data-type="home" className="page-content-wrap">
				<ReactCSSTransitionGroup
					transitionName={this.state.modalType}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{this.state.open
						? createElement(ModalComposition, this.props)
						: false}
				</ReactCSSTransitionGroup>
				<div className="flex-mirror">
					<CategoryMenuComposition
						stores={this.props.stores}
						lang={this.props.lang}
					/>
					<SaleArea stores={this.props.stores} history={this.props.history} />
					<BrandMenuComposition
						stores={this.props.stores}
						lang={this.props.lang}
					/>
				</div>
			</section>
		);
	}
}

export default PrimaryComposition;
