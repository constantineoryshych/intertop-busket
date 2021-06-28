import React, { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import PreviewPhotoView from "./previewPhotoView.jsx";
import PreviewProductItem from "./previewProductItem.jsx";

class PreviewProductComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "productCardState",
					fields: ["key", "item"]
				}
			]
		};
		super(options);
	}

	getFields() {
		const items = {
			model: {
				model: this.state.item.SALE,
				data: `${this.state.item.BRAND}\n\r${this.state.item
					.VID_TOVARA_UA}\n\r${this.state.item.GENDER_UA}`
			},
			size: {
				data: this.props.stores.orderSize.getStore.size
			},
			count: {
				data: `1`
			},
			bonus: {
				data: `+${Math.round((this.state.item.PRICE_ACTION * 0.03).toFixed(2))}`
			},
			price: {
				data: this.state.item.PRICE_ACTION
			}
		};

		return _.map(items, (item, ind) => {
			const param = _.assign(
				{
					key: ind,
					type: ind,
					stores: this.props.stores,
					lang: this.props.lang
				},
				item
			);

			return createElement(PreviewProductItem, param);
		});
	}

	getInner() {
		return (
			<div className="preview-product">
				<div data-info="preview">
					{createElement(PreviewPhotoView, {
						mticode: this.state.key,
						stores: this.props.stores
					})}
				</div>
				{this.getFields()}
			</div>
		);
	}

	render() {
		return this.state.key == null ? false : this.getInner();
	}
}

export default PreviewProductComposition;
