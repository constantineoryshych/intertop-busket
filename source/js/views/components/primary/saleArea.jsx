import React, { Component, createElement } from "react";
import _ from "lodash";
import Banner from "~/views/components/common/banner.jsx";

class SaleArea extends Component {
	render() {
		return (
			<div className="sale-wrapper">
				<div className="list">
					{_.map(["first", "second", "third", "fourth"], (val, key) =>
						createElement(Banner, {
							key: `banner${key}`,
							name: val,
							stores: this.props.stores,
							history: this.props.history
						})
					)}
				</div>
			</div>
		);
	}
}

export default SaleArea;
