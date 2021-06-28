import React, { Component, createElement } from "react";
import Banner from "~/views/components/common/banner.jsx";
import KeyboardComposition from "./keyboard/keyboardComposition.jsx";
import SearchResultComposition from "./searchResultComposition.jsx";

class SearchComposition extends Component {
	render() {
		const params = {
			stores: this.props.stores,
			history: this.props.history,
			lang: this.props.lang
		};

		return (
			<section data-type="search" className="page-content-wrap">
				<div className="search-top">
					<div className="baner">
						<Banner key={1} name="search" stores={this.props.stores} history={this.props.history} />
					</div>
					{createElement(KeyboardComposition, params)}
				</div>
				{createElement(SearchResultComposition, params)}
			</section>
		);
	}
}

export default SearchComposition;
