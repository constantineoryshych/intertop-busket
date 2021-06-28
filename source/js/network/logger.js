import _ from "lodash";

class Logger {
	constructor(options) {
		this.stores = options.stores;
		this.ws = options.ws;
		this.lang = options.lang.Text;
	}

	async init() {
		this.stores.error.subscribe(this.errorHandling.bind(this));
	}

	errorHandling() {
		const errState = this.stores.error.getStore;

		this.send(errState.code, [
			"[",
			errState.class,
			"->",
			errState.method,
			"]: ",
			"\r\n",
			errState.dependencies
		]);
	}

	send(errCode, options = []) {
		const text = this.lang.error[errCode] + _.join(options, "");
		global.console.log(text);
	}
}

export default Logger;
