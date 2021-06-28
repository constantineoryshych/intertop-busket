import _ from "lodash";
import BarcodeScannerCommon from "./barcodeScannerCommon";
import BarcodeScannerSpec from "./barcodeScannerSpec";

class BarcodeScannerController {
	constructor(options) {
		this.stores = options.stores;
		this.history = options.history;

		this.result = {
			key: null,
			item: null
		};

		this.scanValue = "";

		this.tempGoods = new BarcodeScannerSpec();
		this.commonGoods = new BarcodeScannerCommon();

		this.subscribe();
		this.waitScanning();
	}

	subscribe() {
		this.stores.goods.subscribe(() => {
			this.commonGoods.sales = this.saleCodesCollect();
		});

		this.stores.sizes.subscribe(() => {
			this.commonGoods.sizes = this.stores.sizes.getStore;
		});
	}

	saleCodesCollect() {
		return _.map(this.stores.goods.getStore, (val, key) => [key, val.SALE]);
	}

	waitScanning() {
		document.onkeydown = event => {
			const e = event || window.event;

			if (e.keyCode === 13) {
				this.initCheck();
				this.scanValue = "";
			} else this.scanValue += e.key;
		};
	}

	initCheck() {
		let mti = null;

		this.scanValue = this.scanValue.replace(/Shift|%/gi, "");

		mti = this.commonGoods.checkCommon({ value: String(this.scanValue) });

		if (
			mti != null &&
			typeof this.stores.goods.getStore[mti] !== "undefined" &&
			this.stores.goods.getStore[mti].SALE !== "undefined"
		) {
			this.result = {
				key: mti,
				item: this.stores.goods.getStore[mti]
			};
			this.openProductCard();
		} else {
			const spec = this.tempGoods.startSearch({
				scanValue: String(this.scanValue)
			});
			if (spec.key != null) {
				this.result = spec;
				this.openProductCard("spec");
			} else this.notFound();
		}
	}

	openProductCard(type = null) {
		const param = {
			open: true,
			key: this.result.key,
			item: this.result.item,
			spec: type === "spec"
		};

		this.stores.productCardState.set(param);
		this.stores.productCardType.set({ type: "info" });
		this.history.push(`${this.history.location.pathname}#productCard`);
	}

	notFound() {
		this.stores.productCardType.set({ type: "notFound" });
		this.stores.productCardState.set({
			open: true,
			key: null,
			item: null,
			spec: false
		});
		this.history.push(`${this.history.location.pathname}#productCard`);
	}
}

export default BarcodeScannerController;
