import _ from "lodash";
import SpecialGoods from "@/special.json";

class SearchController {
	constructor(options) {
		this.stores = options.stores;

		this.special = {};
		this.goods = {};

		this.value = null;
		this.result = [];
	}

	async init() {
		this.initSearchMaps();
		this.subscribe();
	}

	initSearchMaps() {
		this.searchMap({
			store: this.stores.goods.getStore,
			state: "goods"
		});

		this.searchMap({
			store: SpecialGoods,
			state: "special"
		});
	}

	searchMap(options) {
		_.map(options.store, (val, key) => {
			this[options.state][key] = _.pick(val, ["SALE"]);
		});
	}

	subscribe() {
		this.stores.search.subscribe(this.checkValue.bind(this));
		this.stores.goods.subscribe(this.initSearchMaps.bind(this));
	}

	checkValue() {
		this.result = [];
		const newValue = this.stores.search.getStore.value;

		if (newValue == null) {
			this.stores.searchResult.set({ result: this.result });
		} else {
			this.value = newValue;
			this.searchStart();
		}
	}

	searchStart() {
		global.console.time("SEARCH");

		_.forEach([this.goods, this.special], lists => {
			_.forEach(lists, (val, key) => {
				if (_.includes(val.SALE, this.value)) this.result.push(key);
			});
		});

		global.console.timeEnd("SEARCH");
		this.stores.searchResult.set({ result: this.result });
	}
}

export default SearchController;
