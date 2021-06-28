import _ from "lodash";

class OrderCitiesController {
	constructor(options) {
		this.stores = options.stores;

		this.exeptTargets = {
			reserve: [],
			delivery: []
		};

		this.state = null;
	}

	async init() {
		this.stores.orderStep.subscribe(this.check.bind(this));
	}

	check() { //eslint-disable-line
		const step = this.stores.orderStep.getStore.step;
		if (step !== 2) return false;
		this.state = null;
		this.collectStoreList();
	}

	collectStoreList() {
		//-- fix bag null data
	    try {
	        const orderType = this.stores.orderType.getStore.type;
	        if (orderType === "reserve") {
	            const sizeStore = this.stores.restsData.getStore;
				const shopsList = Object.keys(sizeStore.origin[this.stores.orderSize.getStore.size]);
				const sizeRestsByShops = sizeStore.origin[this.stores.orderSize.getStore.size];

	            this.state = _.filter(
	                shopsList,
	                el =>
	                el.length === 7 && _.includes(this.exeptTargets.reserve, el) === false && sizeRestsByShops[el].QTY > 0
	            );
	        } else {
	            const shopsList = Object.keys(this.stores.shops.getStore);

	            this.state = _.filter(
	                shopsList,
	                el => el.length === 7 && _.includes(this.exeptTargets.delivery, el) === false

			
	            );

	            // MonoBrand
	            // ('undefined' != typeof MonoDecode[el.substring(0, 3)
	        }
	        if (this.state != null) this.accept();
	    } catch (err) {

	    	console.log(err)

	    }

	}

	accept() {
		this.stores.orderCities.set({
			list: this.state
		});
	}
}

export default OrderCitiesController;
