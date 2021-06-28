import { StoreClass } from "redux-store-controller";
import _ from "lodash";

class DataChunk extends StoreClass {
	constructor() {
		super({
			initState: {
				goods: {
					chunk: null,
					err: null
				},
				sizes: {
					chunk: null,
					err: null
				},
				shops: {
					chunk: null,
					err: null
				},
				lr: {
					chunk: null,
					err: null
				},
				sellers: {
					chunk: null,
					err: null
				},
				weather: {
					chunk: null,
					err: null
				}
			}
		});
	}

	update(state, action) {
		switch (action.type) {
			case "SET_ALL_CHUNKS":
				_.forEach(action.data, (value, key) => {
					if (typeof state[key] !== "undefined") state[key].chunk = value;
				});
				break;
			case "SET_CHUNK":
				state[action.data.module].chunk = action.data.chunk;
				break;
			case "SET_ERROR":
				state[action.data.module].err = action.data.err;
				break;
			default:
				return state;
		}
		return state;
	}

	setAll(dataChunks) {
		this._store.dispatch({ type: "SET_ALL_CHUNKS", data: dataChunks });
	}

	setChunk(dataChunk) {
		this._store.dispatch({ type: "SET_CHUNK", data: dataChunk });
	}

	setError(dataError) {
		this._store.dispatch({ type: "SET_ERROR", data: dataError });
	}
}

export default DataChunk;
