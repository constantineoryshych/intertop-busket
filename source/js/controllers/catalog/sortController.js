import _ from "lodash";

class SortController {
	constructor(options) {
		this.stores = options.stores;
		this.sortMask = {};
		this.currentMethod = null;
	}

	async init() {
		this.stores.goods.subscribe(this.sortMaskCollect.bind(this));
		this.stores.productSort.subscribe(this.applySort.bind(this));

		this.sortMaskCollect();
	}

	sortMaskCollect() {
		const productOrigin = this.stores.goods.getStore;

		_.forEach(productOrigin, (item, key) => {
			this.sortMask[key] = {
				PRICE_ACTION: item.PRICE_ACTION,
				SORT: item.SORT
			};
		});
	}

	applySort() {
		const newMethod = this.stores.productSort.getStore.sort;
		if (this.currentMethod === newMethod) return;
		this.currentMethod = newMethod;
		const method = this[this.currentMethod].bind(this);
		const sorted = this.stores.productList.getStore.sort(method);
		this.stores.productList.set(sorted);
	}

	asc(a, b) {
		if (
			parseInt(this.sortMask[a].PRICE_ACTION) <
			parseInt(this.sortMask[b].PRICE_ACTION)
		)
			return -1;
		else if (
			parseInt(this.sortMask[a].PRICE_ACTION) >
			parseInt(this.sortMask[b].PRICE_ACTION)
		)
			return 1;
		return 0;
	}

	desc(a, b) {
		if (
			parseInt(this.sortMask[a].PRICE_ACTION) >
			parseInt(this.sortMask[b].PRICE_ACTION)
		)
			return -1;
		else if (
			parseInt(this.sortMask[a].PRICE_ACTION) <
			parseInt(this.sortMask[b].PRICE_ACTION)
		)
			return 1;
		return 0;
	}

	recom(a, b) {
		return this.sortMask[b].SORT - this.sortMask[a].SORT;
	}
}

export default SortController;
