import { ControllerStateStore } from "redux-store-controller";

class OrderDeliveryTypeController extends ControllerStateStore {
	stateDidUpdate(){
		const stepNext = this.state.type === "address" ? 3 : 2;
		this.stores.orderStep.set({ step: stepNext });
	}
}

export default OrderDeliveryTypeController;