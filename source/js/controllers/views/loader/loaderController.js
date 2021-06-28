import LoaderErrorHandler from './loaderErrorHandler';

class LoaderController extends LoaderErrorHandler {
	constructor(options) {
		super(options);
		this.loaderStore = options.loaderStore;
		this.stores = options.stores;
		this.history = options.history;

		this.unsubscribe = null;
		this.parts = null;

		this.currentPercentage = 0;
		this.percentage = 0;
		this.timer = null;
	}

	async init() {
		this.setTimer();
		this.subscribeChangeLoader();
	}

	setTimer() {
		this.timer = setTimeout(() => {
			if (this.percentage === 100) this.loadingSuccess();
			else this.timerIteration();
		}, 20);
	}

	loadingSuccess() {
		clearTimeout(this.Timer);
		this.Timer = null;
		this.history.push("/screenSaver");
	}

	timerIteration() {
		if (this.percentage < this.currentPercentage) {
			this.stores.loaderProgress.set({
				percentage: (this.percentage += 1),
				err: this.errorText
			});
		}

		this.setTimer();
	}

	subscribeChangeLoader() {
		this.unsubscribe = this.loaderStore.subscribe(this.updateState.bind(this));
	}

	updateState() {
		const err = super.updateState();
		if(err) return;

		const newState = this.loaderStore.getStore;
		if (this.parts == null) this.parts = newState.loaderList.length;
		const perc = newState.step / this.parts * 100;
		this.currentPercentage = Math.round(perc);
	}
}

export default LoaderController;
