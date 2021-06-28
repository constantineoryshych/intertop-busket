import React, { Component } from "react";
import Config from "@/config.json";
import ImageSliderComposition from "~/views/components/common/imageSlider/imageSliderComposition.jsx";
import VideoView from "~/views/components/common/videoView.jsx";

class ScreenSaverComposition extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orientation: Config.orientation.screen
		};
	}

	startSession(){
		this.props.session.startSession();
	}

	render() {
		return (
			<div id="screensaver" onClick={this.startSession.bind(this)}>
				{this.state.orientation === "vert"
					? <VideoView stores={this.props.stores} />
					: <ImageSliderComposition stores={this.props.stores} />}
			</div>
		);
	}
}

export default ScreenSaverComposition;
