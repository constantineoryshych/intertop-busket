import React, { Component } from "react";
import SlideView from "./slideView.jsx";

class ImageSliderComposition extends Component {
	constructor(props) {
		super(props);

		this.timer = null;
	}

	incrementCount() {
		this.timer = setTimeout(this.step.bind(this), 5000);
	}

	step() {
		const store = this.props.stores.screenSaverSlider;
		store.set({
			current: store.getStore.current === 1 ? 2 : 1
		});
	}

	render() {
		return (
			<div>
				<SlideView key="1" slide={1} stores={this.props.stores} />
				<SlideView key="2" slide={2} stores={this.props.stores} />
			</div>
		);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentDidMount() {
		this.incrementCount();
	}

	componentDidUpdate() {
		this.incrementCount();
	}
}

export default ImageSliderComposition;
