import io from "socket.io-client";
import Config from "@/config.json";

class WsClient {
	constructor(options) {
		this.stores = options.stores;
		this.lang = options.lang.Text;
	}

	async init() {
		await this.startWs();
		await this.initBaseHandler();
	}

	async startWs() {
		this.socket = io(`ws://${Config.network.host}:${Config.network.port}`);
	}

	async initBaseHandler() {
		this.socket.on("connect", () => {
			global.console.log("connect");
			this.socket.emit("INTRO", { data: "im player" });
		});

		this.socket.on("connect_error", this.errorHand.bind(this));
		// this.socket.on("reconnect_attempt", this.errorHand.bind(this));

		this.socket.on("CHUNKS", message => {
			this.stores.dataChunk.setAll(message);
		});
	}

	errorHand(err) {
		this.stores.error.set({
			code: "networkConnection",
			type: "critical",
			class: "WsClient",
			method: null,
			dependencies: err
		});
	}
}

export default WsClient;
