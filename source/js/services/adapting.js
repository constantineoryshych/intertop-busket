import Config from "@/config.json";

class Adapting {
	constructor() {
		this.width = 0;
		this.height = 0;
		this.orientation = null;

		window.onresize = this.init.bind(this);
	}

	async init() {
		this.figureOutResolution();
		this.figureOutOrientation();
		this.applyOrientation();
	}

	figureOutResolution() {
		this.width = document.documentElement.clientWidth;
		this.height = document.documentElement.clientHeight;
	}

	figureOutOrientation() {
		this.orientation = this.width > this.height ? "hori" : "vert";
	}

	applyOrientation() {
		Config.orientation.screen = this.orientation;
		document.querySelector("body").id = this.orientation;
	}
}

export default Adapting;
