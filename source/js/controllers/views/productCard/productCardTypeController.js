import { ControllerStateStore } from "redux-store-controller";

class ProductCardTypeController extends ControllerStateStore {
	stateDidUpdate(){
		switch(this.state.type) {
			case "info":
				this.typeInfo();
				break;
			case "order":
				this.typeOrder();
				break;
			case "thank":
				this.typeThank();
				break;
			case "nonFound":
			default:
				this.typeNotFound();
				break;
		}
	}

	typeInfo() {;
		this.stores.restsTab.reset();
		this.stores.orderSize.reset();
		this.stores.orderSizeTarget.reset();
		this.stores.orderStep.reset();
		this.stores.orderType.reset();
		this.stores.availableOrder.reset();
		this.stores.previewSliderView.reset();
	}

	typeOrder() {
		this.stores.orderDeliveryType.reset();
		this.stores.orderCity.reset();
		this.stores.orderCode.reset();
		this.stores.orderPhone.reset();
		this.stores.orderPhoneParsed.reset();
		this.stores.orderSeller.reset();
	}

	// eslint-disable-next-line
	typeThank() {

	}

	// eslint-disable-next-line
	typeNotFound() {

	}
}

export default ProductCardTypeController;