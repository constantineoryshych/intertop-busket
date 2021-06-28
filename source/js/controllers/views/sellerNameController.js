import _ from "lodash";

class SellerNameController {
	constructor(options) {
		this.stores = options.stores;

		this.state = {
			number: null,
			name: null
		};
	}

	async init() {
		this.stores.orderSeller.subscribe(this.changeHandler.bind(this));
	}

	changeHandler() {
		const newState = this.stores.orderSeller.getStore.number;
		if (this.state.number === newState) return;
		this.state.number = newState;
		this.state.name = null;
		this.findSellerName();
	}

	findSellerName() {
		const sellers = this.stores.sellers.getStore;
		_.forEach(sellers, (val, number) => {
			if (parseInt(this.state.number) === parseInt(number))
				this.state.name = val;
		});
		console.log(this.state.name)
		this.stores.sellerName.set({ name: this.state.name });
	}
}

export default SellerNameController;
