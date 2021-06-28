import { Component, createElement } from "react";
import Config from "@/config.json";

class PreviewPhotoView extends Component {
	render() {
		const n = Config.network;

		return createElement("img", {
			src: `http://${n.host}:${n.port}${n.path.catalogImg}${this.props
				.mticode}_1.jpg`,
			ref: "orderPreview",
			onError: this.defaultSrc.bind(this)
		});
	}

	defaultSrc() {
		this.refs.orderPreview.setAttribute(
			"src",
			"./build/style/img/icons/no-image.png"
		);
	}

	didChanges() {
		this.refs.orderPreview.onload = () => {
			if (this.refs.orderPreview.height > this.refs.orderPreview.width) {
				this.refs.orderPreview.setAttribute("style", "height: 100%; width: auto");
			} else {
				this.refs.orderPreview.setAttribute("style", "");
			}
		};
	}

	componentDidMount() {
		this.didChanges();
	}

	componentDidUpdate() {
		this.didChanges();
	}
}

export default PreviewPhotoView;
