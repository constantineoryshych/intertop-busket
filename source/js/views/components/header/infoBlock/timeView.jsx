import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class TimeView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "dateTime",
					fields: ["time"]
				}
			]
		};
		super(options);
	}

	render() {
		return (
			<p className="fadeInRight">
				{this.state.time}
			</p>
		);
	}
}

export default TimeView;
