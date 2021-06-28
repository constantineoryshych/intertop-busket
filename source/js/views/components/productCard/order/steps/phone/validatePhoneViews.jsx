import React from "react";
import _ from 'lodash';
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import { ParsePhoneNamber } from "~/services/parsers";

class ValidatePhoneView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "orderPhoneParsed",
					fields: ["number"]
				}
			]
		};
		super(options);
	}

	cheackWrongNam() {
		return _.size(this.props.stores.orderPhone.getStore.number) >= 2 && ParsePhoneNamber(this.state.number) === false
			? "wrong"
			: "";
	}

	render() {
		return (
			<div>
				<span className={this.cheackWrongNam()}>Некоректний набір</span>
			</div>
		);
	}
}

export default ValidatePhoneView;
