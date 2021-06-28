import React, { Component } from "react";
import Banners from "@/banners.json";

class NonTouchView extends Component {
	render() {
		return (
			<div className="non-touch">
				<img
					ref="nonTouchSlide"
					src={`./build/img/header/${this.getCurrentPageBanner()}.jpg`}
					onError={this.defaultSrc.bind(this)}
				/>
			</div>
		);
	}

	getCurrentPageBanner() {
		try {
			return Banners.header.location[this.state.loc][0];
		} catch (err) {
			return Banners.header.default;
		}
	}

	defaultSrc() {
		this.refs.nonTouchSlide.setAttribute(
			"src",
			`./build/img/header/${Banners.header.default}.jpg`
		);
	}

	componentDidMount() {
		this.state = {
			loc: this.props.history.location.pathname
		};
	}

	componentWillMount() {
		this.unlisten = this.props.history.listen(location => {
			if (this.state.loc === location.pathname) return;
			this.setState({ loc: location.pathname });
		});
	}

	componentWillUnmount() {
		this.unlisten();
	}
}

export default NonTouchView;
