import React, { Component } from "react";
import Config from '@/config.json';

class VideoView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1,
			path: Config.screenSaver.path.video,
			slideCnt: 3
		};
	}

	render() {
		return <video src={this.state.path} autoPlay="true" loop="true" muted="true" />;
	}
}

export default VideoView;
