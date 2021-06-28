import _ from "lodash";
import TempGoods from "@/special.json";

class BarcodeScannerSpec {
	constructor() {
		this.result = {
			key: null,
			item: null
		};

		this.scanValue = "";
		this.tempGoods = TempGoods;
	}

	startSearch(options) {
		this.reset();

		this.scanValue = options.scanValue;
		console.log(this.scanValue)
		return this.initCheck();
	}

	initCheck() {
		_.forEach(this.tempGoods, (val, mti) => {
			if (this.scanValue === mti) {
				this.result = {
					key: mti,
					item: val
				};
			} else if (this.scanValue === val.SALE) {
				this.result = {
					key: mti,
					item: val
				};
			} else {
				_.forEach(val.BARCODES, (inner, code) => {
					if (this.scanValue === String(code)) {
						this.result = {
							key: mti,
							item: val
						};
					} else if (this.scanValue === String(inner.SIZECODE)) {
						this.result = {
							key: mti,
							item: val
						};
					}
				});
			}
		});

		return this.result;
	}

	reset() {
		this.scanValue = "";

		this.result = {
			key: null,
			item: null
		};
	}
}

export default BarcodeScannerSpec;
