import _ from "lodash";
import SendRequest from "~/services/request";
import Config from "@/config.json";

class RestsController {
	constructor(options) {
		this.stores = options.stores;

		this.state = {
			key: null,
			open: false
		};
	}

	async init() {
		this.stores.productCardState.subscribe(this.checkChanges.bind(this));
	}

	checkChanges() {
		const newState = this.stores.productCardState.getStore;
		if (
			newState.open !== true ||
			newState.key == null
		)
			return;

		this.state = {
			key: newState.key,
			open: newState.open
		};

		this.getRests();
	}

	getRests() {
		this.stores.restsTab.reset();
		this.stores.orderSize.reset();
		this.stores.orderSizeTarget.reset();
		this.stores.restsData.assign({ origin: null, parsed: null, err: null });
		this.stores.availableOrder.reset();
		this.stores.previewSliderView.reset();
		SendRequest.getApi({
			key: this.state.key
		})
			.then(result => this.parseRests(result[this.state.key]))
			.then(result => this.stores.restsData.assign(result))
			.catch(this.errorHandler.bind(this));
	}

	parseRests(restsData) {
		const mapParsed = {};
		_.forEach(this.stores.productCardState.getStore.item.SIZE, val => {
			const size = val == null ? "NS" : val;
			mapParsed[size] =
				_.includes(_.keys(restsData), size) === false
					? "non"
					: RestsController.getRestClass(size, restsData[size]);
		});

		return { origin: restsData, parsed: mapParsed };
	}

	static getRestClass(size, restData) {
		const cn = [];

		_.forEach(_.keys(restData), shop => {
			if (restData[shop].QTY < 1) return;

			if (shop === "MITIN01" || shop === "W650" ) {
				if (_.includes(cn, "stock") === false) cn.push("stock");
			} else if (shop === Config.main.shopCode) {
				if (_.includes(cn, "store") === false) cn.push("store");
			} else if (_.includes(cn, "others") === false) cn.push("others");
		});

		return cn.length < 1 ? "non" : cn.join(" ");
	}

	errorHandler(error) {
		if (this.stores.productCardState.getStore.open === false) return;
		this.stores.restsData.set({origin: null, parsed: null, err: error});
	}
}

export default RestsController;
