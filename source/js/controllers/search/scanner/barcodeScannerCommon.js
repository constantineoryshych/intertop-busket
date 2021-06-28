import _ from "lodash";

class BarcodeScannerCommon {
	constructor() {
		this.data = {
			sizes: {},
			sales: []
		};

		this.scanValue = null;
	}

	// eslint-disable-next-line
	set sizes(sizesData) {
		this.data.sizes = sizesData;
	}

	// eslint-disable-next-line
	set sales(salesData) {
		this.data.sales = salesData;
	}

	checkCommon(options) {
		this.scanValue = _.trim(options.value);

		return /[A-z]/.test(this.scanValue) === true
			? this.checkSaleField()
			: this.checkSize();
	}

	checkSaleField() {
		let result = null;
		this.scanValue = this.scanValue.toUpperCase();

		_.forEach(this.data.sales, val => {
			if (val[1] === this.scanValue) result = val[0];
		});

		return result;
	}

	checkSize() {
		let result = null;
		this.scanValue = parseInt(this.scanValue);

		_.forEach(this.data.sizes, (val, mti) => {
			if (this.checkSizesCode(mti) || this.checkMtiCode(mti))
				result = val.MTICODE;
		});

		return result;
	}

	checkSizesCode(mti) {
		return this.scanValue === this.data.sizes[mti].SIZECODE;
	}

	checkMtiCode(mti) {
		return this.scanValue === mti;
	}
}

export default BarcodeScannerCommon;
