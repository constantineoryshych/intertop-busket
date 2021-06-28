import Config from "@/config.json";

class SessionController {
	constructor(options) {
		this.history = options.history;
		this.timer = null;
	}

	async init() {
		this.history.listen(this.locationHandler.bind(this));
		document.querySelector("body").onclick = this.wait.bind(this);
	}

	startSession() {
		this.history.push("/primary");
	}

	closeSession() {
		this.history.push("/screenSaver");
	}

	locationHandler(location) {
		if (
			location.pathname === "/screenSaver" &&
			location.hash === "#productCard"
		)
			this.wait();
	}

	wait() {
		if (this.history.location.pathname === "/") return;
		clearInterval(this.timer);
		this.timer = setTimeout(
			this.closeSession.bind(this),
			Config.screenSaver.delay
		);
	}
}

export default SessionController;
