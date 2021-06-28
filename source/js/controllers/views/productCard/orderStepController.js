import { ControllerStateStore } from "redux-store-controller";
import Config from "@/config.json";

class OrderStepController extends ControllerStateStore {
	stateDidUpdate(){
		let stepData;
		let storeData;
		const targetTab = this.stores.restsTab.getStore.tab;

		if (targetTab === "store") {
			stepData = this.state.type === "reserve" ? 3 : 1;
			storeData = Config.main.shopCode;
		} else {
			stepData = this.state.type === "reserve" ? 2 : 1;
			storeData = null;
		}

		this.stores.orderCity.reset();
		this.stores.orderDeliveryType.reset();
		this.stores.orderCode.reset();

		this.stores.orderStep.set({ step: stepData });
		this.stores.orderStore.set({ store: storeData });
	}
}

export default OrderStepController;