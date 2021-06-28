class LoaderErrorHandler {
	constructor(options) {
		this.stores = options.stores;
		this.history = options.history;

		this.unsubscribe = null;
		this.errorText = null;
	}

	updateState() {
		const newState = this.loaderStore.getStore;
		if (newState.err == null) return false;
		this.errorHandling(newState);
		return true;
	}

	errorHandling(newState) {
		this.errorText = newState.err.message;
		if(this.history.location.pathname !== "/") history.push("/");
	}
}

export default LoaderErrorHandler;
