import Config from "@/config.json";
import _ from "lodash";

class HistoryController {
	constructor(options) {
		this.history = options.history;
		this.stores = options.stores;
	}

	async init() {
		this.history.listen(this.handler.bind(this));
	}

	handler(location) {
		if (location.pathname === "/primary") this.whenHome();

		const prev = this.history.entries[this.history.index - 1];

		if (location.pathname !== prev.pathname)
			this.stores.viewport.set({ viewport: location.pathname });

		if (location.pathname === "/primary" && prev.pathname === "/main")
			this.whenCloseMain();

		if (
			_.includes(prev.hash, "#productCard") &&
			_.includes(location.hash, "#productCard") === false
		)
			this.whenProductCardClose();

		if (_.includes(location.hash, "#productCard"))
			HistoryController.whenProductCardOpen();
	}

	whenHome() {
		if (this.history.location.hash !== "") return;
		this.stores.catalogEvent.set({ type: "reset" });
	}

	whenCloseMain() {
		this.stores.mainModal.set({
			open: false,
			currentCategory: "VID_TOVARA_UA"
		});

		this.stores.mainViewGrid.set({
			grid: Config.orientation.screen === "vert" ? 9 : 10
		});
	}

	static whenProductCardOpen() {
		//
	}

	whenProductCardClose() {
		this.stores.orderPhone.set({ number: "" });
		this.stores.orderSeller.set({ number: "" });
		this.stores.orderPhoneParsed.set({ number: "+38 (0__) ___-__-__" });
		this.stores.orderInputFocus.set({ focus: "phone" });
	}
}

export default HistoryController;
