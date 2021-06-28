import _ from "lodash";

class ProductListSizeController {
	constructor(options) {
		this.stores = options.stores;
	}

	async init() {
		this.stores.productList.subscribe(this.size.bind(this));
	}

	size() {
		const currentSize = this.stores.productListSize.getStore;
		const newSize = _.size(this.stores.productList.getStore);
		if (currentSize === newSize) return;
		this.stores.productListSize.set({ size: newSize });
	}
}

export default ProductListSizeController;
