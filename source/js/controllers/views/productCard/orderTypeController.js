import { ControllerStateStore } from "redux-store-controller";
import Config from "@/config.json";

class OrderTypeController extends ControllerStateStore {
	stateDidUpdate() {
		const targetTab = this.stores.restsTab.getStore.tab;
		const storeData = targetTab === "store" ? Config.main.shopCode : null;

		let stepData = 1;

		const isReserve = this.state.type === "reserve";
		if (isReserve) stepData = targetTab === "store" ? 3 : 2;

		this.stores.orderStep.set({ step: stepData });
		this.stores.orderStore.set({ store: storeData });
	}
}

export default OrderTypeController;
