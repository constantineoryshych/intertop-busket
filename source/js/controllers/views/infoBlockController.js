import _ from "lodash";
import DateView from "~/views/components/header/infoBlock/dateView.jsx";
import TimeView from "~/views/components/header/infoBlock/timeView.jsx";

class InfoBlockController {
	constructor(options) {
		this.stores = options.stores;

		this.current = 0;
		this.slides = [DateView, TimeView];

		this.step();
	}

	step() {
		this.stores.infoBlock.set({ slide: this.slides[this.current] });
		this.current = this.current < _.size(this.slides) - 1
			? this.current + 1
			: 0;
		setTimeout(this.step.bind(this), 10000);
	}
}

export default InfoBlockController;
