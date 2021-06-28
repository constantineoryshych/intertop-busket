import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import Config from '@/config.json';

class SlideView extends ComponentStateStore {
	constructor(propsData){
		super({
			props: propsData,
			stores: [
				{
					store: "screenSaverSlider",
					fields: ["current"]
				}
			]
		});

		this.path = Config.screenSaver.path.slider;
	}

	isCurrent() {
		return this.state.current === this.props.slide ? "slideOut" : "slideIn";
	}

	render() {
		return (
			<img
				className={`slide ${this.isCurrent()}`}
				src={`${this.path}${this.props.slide}.jpg`}
				alt=""
			/>
		)
	}
}

export default SlideView;