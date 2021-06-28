class ErrorController {
	constructor(options){
		this.stores = options.stores;
		this.lang = options.lang.Text;
	}

	async init(){
		this.stores.error.subscribe(this.errorHandler.bind(this));
	}

	errorHandler(){
		const errState = this.stores.error.getStore;

		if(errState.type === "warn") global.console.warn(errState);
		if(errState.type !== "critical") return;

		this.stores.loaderProgress.set({
			err: this.lang.error[errState.code]
		});
	}
}

export default ErrorController;