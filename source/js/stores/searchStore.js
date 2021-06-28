import { StoreClass } from "redux-store-controller";

class SearchStore extends StoreClass {
	constructor() {
		super({
			initState: { value: null }
		});
	}

	update(state, action) {
		switch (action.type) {
			case "INPUT_CHANGE":
				return {
					value:
						state.value == null ? action.input : `${state.value}${action.input}`
				};
			case "RESET":
				return { value: null };
			case "BACKSPACE":
				return { value: state.value.slice(0, -1) };
			default:
				return state;
		}
	}

	inputChange(value) {
		this._store.dispatch({ type: "INPUT_CHANGE", input: value });
	}

	reset() {
		this._store.dispatch({ type: "RESET" });
	}

	backspace() {
		this._store.dispatch({ type: "BACKSPACE" });
	}
}

export default SearchStore;
