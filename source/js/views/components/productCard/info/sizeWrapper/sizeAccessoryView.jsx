import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class SizeAccessoryView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "restsTab",
					fields: ["tab"]
				}
			]
		};
		super(options);
	}

	getText() {
		switch (this.state.tab) {
			case "store":
				return this.props.classNames.split(" ").includes("store")
					? this.props.lang["accessory-size"]["yes-shop"]
					: this.props.lang["accessory-size"]["no-shop"];
			case "chain":
				return this.props.classNames.split(" ").includes("others") ||
				this.props.classNames.includes("stock")
					? this.props.lang["accessory-size"]["yes-merega"]
					: this.props.lang["accessory-size"]["no-merega"];
			default:
				return this.props.lang["accessory-size"]["no-merega"];
		}
	}

	render() {
		return (
			<div data-size="accessory" className={`rel ${this.props.classNames}`}>
				<p>
					{this.getText()}
				</p>
			</div>
		);
	}

	chooseModelSize() {
		this.props.stores.orderSize.set({ size: "NS" })
		this.props.stores.orderSizeTarget.set({ rests: this.props.classNames.split(" ") })
	}

	componentDidMount() {
		this.chooseModelSize();
	}

	componentDidUpdate() {
		this.chooseModelSize();
	}
}

export default SizeAccessoryView;
