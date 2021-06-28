import React from "react";
import { ComponentStateStore } from "redux-store-controller";
import MonoDecode from "@/monoBrandDecode.json";

class StoreItemView extends ComponentStateStore {
	constructor(propsData){
		super({
			props: propsData,
			storesRules: [
				{
					store: "orderStore",
					fields: ["store"]
				}
			]
		})
	}

	chooseStore() {
		this.props.stores.orderStore.set({ store: this.props.data });
	}

	isActive() {
		return this.state.store === this.props.data
			? "active"
			: "";
	}

	getStoreInfo() {
		return typeof this.props.stores.shops.getStore[this.props.data] ===
		"undefined"
			? false
			: this.parseInner();
	}

	parseInner() {
		try {

		const shopInfo = this.props.stores.shops.getStore[this.props.data];
			return (
			<p>
				{`Режим роботи: ${shopInfo.TIME_FROM.slice(0, -3)} - ${shopInfo.TIME_TO.slice(0, -3)}`}
				<br />
					{shopInfo.ADR_MAG}
				</p>
			);

			} catch (err) {

				console.log(err)

			}

	}

	validateMonoBrand(){
		try{
			return (<h4>
				{`${MonoDecode[this.props.data.substring(0, 3)][1]}-${this.props.data.substring(this.props.data.length - 2)}`}
			</h4>)
		} catch(e){
			return (<h4>Невідомий код магазину</h4>)
		}
	}

	render() {
		return (
			<div
				data-mono={this.props.data.substring(0, 3)}
				data-code={this.props.data.substring(this.props.data.length - 2)}
				className={this.isActive()}
				onClick={this.chooseStore.bind(this)}
			>
				<div>
					{this.validateMonoBrand()}
					{this.getStoreInfo()}
				</div>
			</div>
		);
	}
}

export default StoreItemView;
