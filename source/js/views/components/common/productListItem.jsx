import React, { Component, createElement } from "react";
import BrandView from "~/views/components/common/brandView";
import Config from "@/config.json";
import TempGoods from "@/special.json";

class ProductListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.data,
			item: props.stores.goods.getStore[props.data] || TempGoods[props.data],
			spec: typeof TempGoods[props.data] !== "undefined"
		};
	}

	componentWillReceiveProps(props) {
		if (this.state.key === props.data) return;

		this.setState({
			key: props.data,
			item: props.stores.goods.getStore[props.data] || TempGoods[props.data],
			spec: typeof TempGoods[props.data] !== "undefined"
		});
	}

	openProductCard() {
		this.props.stores.productCardState.set({
			open: true,
			key: this.state.key,
			item: this.state.item,
			spec: this.state.spec
		});

		this.props.stores.productCardType.set({ type: "info" });

		this.props.history.push(
			`${this.props.history.location.pathname}#productCard`
		);
	}

	getBrand() {
		return createElement(BrandView, { name: this.state.item.BRAND });
	}

	render() {
		const PRICE_ACTION =  this.state.item.PRICE_ACTION;
		const PRICE_BASE   =  this.state.item.PRICE_BASE;
		let wisionPropsProcent  =  Math.round(((PRICE_BASE - PRICE_ACTION) / PRICE_BASE * 100));

		const ONLY_ONLINE_VOBLER = (this.state.item.ONLY_ONLINE !== "0" && this.state.item.ONLY_ONLINE !== "false"
		&& this.state.item.ONLY_ONLINE !== null) ? <p className="vobOnlineExclusive">Online exclusive</p> : "";
		const VOBLER_PROCENT = (wisionPropsProcent > 10) ? 
		<div className="vobProcent"><p>{"-" + wisionPropsProcent + "%"}</p></div> : "";
		return (
			<div
				data-product-item={this.state.key}
				className="in"
				onClick={this.openProductCard.bind(this)}
			>
				<div className="info">
					{VOBLER_PROCENT}
					{ONLY_ONLINE_VOBLER}
					<div className="brand-logo-wrap">
						{this.getBrand()}
					</div>
					<p>
						{this.state.item.PRICE_ACTION}
					</p>
				</div>

				<div className="preview-wrap">
					<img
						ref="preview"
						src={`http://${Config.network.host}:${Config.network.port}${Config
							.network.path.catalogImg}${this.state.key}_1.jpg`}
						onError={this.defaultSrc.bind(this)}
					/>
				</div>
			</div>
		);
	}

	didChanges() {
		this.refs.preview.onload = () => {
			if (this.refs.preview.height > this.refs.preview.width) {
				this.refs.preview.setAttribute("style", "height: 100%; width: auto");
			} else {
				this.refs.preview.setAttribute("style", "");
			}
		};
	}

	componentDidMount() {
		this.didChanges();
	}

	componentDidUpdate() {
		this.didChanges();
	}

	defaultSrc() {
		this.refs.preview.setAttribute(
			"src",
			"./build/style/img/icons/no-image.png"
		);
	}
}

export default ProductListItem;
