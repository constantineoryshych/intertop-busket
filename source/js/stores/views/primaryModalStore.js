import { StoreClass } from "redux-store-controller";
import _ from "lodash";

class PrimaryModalStore extends StoreClass {
	constructor() {
		super({
			initState: {
				open: false,
				modalType: "category",
				title: null
			}
		});
	}

	update(state, action) {
		switch (action.type) {
			case "UPDATE":
				return _.assign(state, action.value);
			case "OPEN":
				return {
					open: true,
					modalType: action.modelType,
					title: action.title
				};
			case "CLOSE":
				return {
					open: false,
					modalType: state.modalType,
					title: state.title
				};
			default:
				return state;
		}
	}

	open(options) {
		this._store.dispatch({
			type: "OPEN",
			modelType: options.type,
			title: options.title
		});
	}

	close() {
		this._store.dispatch({ type: "CLOSE" });
	}
}

export default PrimaryModalStore;
