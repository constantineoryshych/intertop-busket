import { createElement } from "react";
import _ from "lodash";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import { ParsePhoneNamber } from "~/services/parsers";

class ConfirmButtonView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderStep",
					fields: ["step",]
				},
				{
					store: "orderStore",
					fields: ["store"]
				},
				{
					store: "orderPhone",
					fields: ["number"]
				}
			]
		};
		super(options);
	}

	isAvailable() {
		switch (this.state.step) {
			case 2:
				return this.state.store == null ? "disable" : "";
			case 3:
				return _.size(this.state.number) === 9 &&
				ParsePhoneNamber(this.props.stores.orderPhoneParsed.getStore.number)
					? ""
					: "disable";
			default:
				return "disable";
		}
	}

	nextStep() {
		if (this.isAvailable() === "disable") return;
		switch (this.state.step) {
			case 2:
				this.confirmStore();
				break;
			case 3:
				this.confirmPhone();
				break;
			default:
				break;
		}
	}

	confirmStore() {
		if (this.state.store == null) return;
		this.props.stores.orderStep.set({ step: 3 });
	}

	confirmPhone() {
		this.props.stores.orderSend.set({
			status: "ready",
			answer: null,
			error: null
		});
	}

	render() {
		return createElement(
			"div",
			{
				className: `border-button-accept ${this.isAvailable()}`,
				onClick: this.nextStep.bind(this)
			},
			createElement("p", null, this.props.lang.button.confirm)
		);
	}
}

export default ConfirmButtonView;
