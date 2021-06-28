import { createElement } from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class InputView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderInputFocus",
					fields: ["focus"]
				},
				propsData.subscribe
			]
		};
		super(options);
	}

	changeFocus() {
		if (this.state.focus === this.props.inputType) return;
		this.props.stores.orderInputFocus.set({ focus: this.props.inputType });
	}

	isFocus() {
		return this.state.focus === this.props.inputType ? "active" : "";
	}

	render() {
		return createElement("input", {
			id: this.props.inputType,
			className: this.isFocus(),
			value: this.state.number || "",
			autoComplete: "off",
			type: "text",
			name: "",
			readOnly: true,
			onClick: this.changeFocus.bind(this)
		});
	}
}

export default InputView;
