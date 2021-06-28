import { ControllerStateStore } from "redux-store-controller";
import forEach from "lodash/forEach";
import includes from "lodash/includes";
import size from "lodash/size";
import Config from "@/config.json";

class BuyButtonsActivator extends ControllerStateStore {
	stateDidUpdate() {
		if (this.state.rests == null) return;
		this.activateButton();
	}

	activateButton() {
 		const isStore = includes(this.state.rests, "store");
 		const isStock = includes(this.state.rests, "stock");
  		const isOthers = includes(this.state.rests, "others");
  		  
  		const tabStore = this.state.tab === "store";
  		  
  		const button = {		  		
			delivery: tabStore ? isStore && isStock : isStock,
			pickUp: tabStore ? isStore && isStock : isStock,
  			reserve: tabStore ? isStore : isOthers
  		};

		this.stores.availableOrder.set(this.restrictionCheck(button));
	}

	restrictionCheck(button) {
		const product = this.stores.productCardState.getStore.item;
		const result = button;

		forEach(button, (qqq, name) => {
			const rules = Config.order.restrictionRules[name];
			if (!rules) return;

			for (let i = 0; i < rules.length; i++) {
					let r = false;
					const rule = rules[i];
					const fields = Object.keys(rule);
					for (let i = 0; i < fields.length; i++) {
						const values = rule[fields[i]];
						const isInclude = Array.includes(values, product[fields[i]])
						if (!r && !isInclude) break;
						r = isInclude;
					}

					if (r) {
						button[name] = !r;
						break;
					}

			}

		});

		return result;
	}
}

export default BuyButtonsActivator;
