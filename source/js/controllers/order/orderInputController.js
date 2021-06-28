import _ from "lodash";

class OrderInputController {
	constructor(options) {
		this.stores = options.stores;
	}

	async init() {
		this.stores.orderInputButton.subscribe(this.change.bind(this));
	}

	change() {
		const char = this.stores.orderInputButton.getStore.value;
		const focus = this.stores.orderInputFocus.getStore.focus;
		const store =
			focus === "phone" ? this.stores.orderPhone : this.stores.orderSeller;
		const value = store.getStore.number;

		store.set({ number: OrderInputController.parse(value, char) });
	}

	static parse(value, char) {
		if (char === "delete") {
			if (_.size(value) > 0) return value.slice(0, -1);
			return value;
		}
		if (_.size(value) < 9) return `${value}${char}`;
		return value;
	}
}

export default OrderInputController;
