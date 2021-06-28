import _ from "lodash";
import request from "browser-request";
import Config from "@/config.json";

class DataController {
	constructor(options) {
		this.stores = options.stores;
		this.logger = options.logger;

		this.currentStamps = {
			goods: null,
			sizes: null,
			shops: null,
			weather: null,
			lr: null,
			seller: null
		};

		this.contentPath = `http://${Config.network.host}:${Config.network
			.port}${Config.network.path.db}`;

		this.subscribe();
	}

	subscribe() {
		this.stores.dataChunk.subscribe(() => {
			this.searchChanges(this.stores.dataChunk.getStore);
		});
	}

	searchChanges(newState) {
		_.map(newState, (value, moduleName) => {
			if (this.currentStamps[moduleName] !== value.chunk) {
				this.currentStamps[moduleName] = value.chunk;

				this.getData({
					module: moduleName,
					chunk: this.currentStamps[moduleName]
				});
			}
		});
	}

	getData(options) {
		const urlString = `${this
			.contentPath}out_${options.module}_${options.chunk}.json`;

		request(
			{ method: "GET", url: urlString, json: true },
			(er, response, body) => {
				this.checkResponse(er, response, body, options);
			}
		);
	}

	checkResponse(er, response, body, param) {
		if (er) this.logger.send("loadPackage", [param.module]);
		else if (response.statusCode !== 200) {
			this.logger.send("loadPackage", [param.module, ` status code: ${response.statusCode}`]);
		} else if (response.statusCode === 200) {
			this.saveData({ module: param.module, data: body });
		}
	}

	saveData(options) {
		if (typeof this.stores[options.module] === "undefined")
			this.logger.send("savePackage", [options.module]);
		else this.stores[options.module].set(options.data);
	}
}

export default DataController;
