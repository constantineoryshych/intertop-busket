import _ from "lodash";

class OrderPhoneParseController {
	constructor(options) {
		this.stores = options.stores;
	}

	async init() {
		this.stores.orderPhone.subscribe(this.change.bind(this));
	}

	change() {
		const value = this.stores.orderPhone.getStore.number;

		this.stores.orderPhoneParsed.set({
			number: `+38 (0${OrderPhoneParseController.parse(value)}`
		});
	}

	static parse(value) {
		const val = _.split(value, "");
		const temp = ['_', '_', ')', ' ', '_', '_', '_', '-', '_', '_', '-', '_', '_'];

		let slash = 0;

		_.forEach(val, (v, i) => {
			if(slash >= _.size(temp)) return;
			temp[slash] = v;
			switch (i) {
				case 1:
					slash += 3;
					break;
				case 4:
				case 6:
					slash += 2;
					break;
				default:
					slash += 1;
					break;
			}
		});

		return _.join(temp, '');
	}
}

export default OrderPhoneParseController;
