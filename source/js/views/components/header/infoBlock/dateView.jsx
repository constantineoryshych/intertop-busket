import React from "react";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";

class DateView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "dateTime",
					fields: ["dayOfWeek", "date"]
				}
			]
		};
		super(options);
	}

	render() {
		return (
			<div className="date fadeInRight">
				<p>{this.state.dayOfWeek}</p>
				<p>{this.state.date}</p>
			</div>
		);
	}
}

export default DateView;
