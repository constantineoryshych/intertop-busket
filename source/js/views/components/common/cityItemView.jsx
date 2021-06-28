import { createElement } from "react";
import { ComponentStateStore } from "redux-store-controller";
import CityDecode from "@/cityDecode.json";

class CityItemView extends ComponentStateStore {
	constructor(propsData){
		super({
			props: propsData,
			storesRules: [
				{
					store: "orderCity",
					fields: ["city"]
				}
			]
		})
	}

	chooseCity() {
		this.props.stores.orderCity.set({ city: this.props.data });
	}

	isActive() {
		return this.state.city === this.props.data
			? "active"
			: "";
	}

	render() {
		try {
				return createElement(
					"div",
					{
						"data-code": this.props.data,
						className: this.isActive(),
						onClick: this.chooseCity.bind(this)
					},
					createElement("p", null, CityDecode[this.props.data].name)
				);

		} catch (err) {
				return createElement(
					"div",
					{
						"data-code": this.props.data,
						className: this.isActive(),
						onClick: this.chooseCity.bind(this)
					},
					createElement("p", null, "Інформація відсутня")
				);
		}
	}
}

export default CityItemView;
