import Config from "@/config.json";

class MainGridController {
	constructor(options) {
		this.stores = options.stores;
	}

	async init() {
		if (Config.orientation.screen === "vert") this.subscribeModalOpen();
	}

	subscribeModalOpen() {
		this.stores.mainModal.subscribe(() => {
			const newState = this.stores.mainModal.getStore;
			this.stores.mainViewGrid.set({
				grid: newState.open ? 6 : 9
			});
		});
	}
}

export default MainGridController;
