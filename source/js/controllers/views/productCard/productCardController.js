import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import ProductCardComposition from "~/views/components/productCard/productCardComposition.jsx";

class ProductCardController {
	constructor(options) {
		this.history = options.history;
		this.stores = options.stores;
		this.params = options;

		this.state = false;
	}

	async init() {
		this.stores.previewSliderView.set({ slide: 1 });
		this.history.listen(location => {
			if (location.hash === "#productCard") this.openProductCard();
			else if (location.hash === "" && this.state) this.closeProductCard();
		});
	}

	openProductCard() {
		render(
			createElement(ProductCardComposition, this.params),
			document.getElementById("modal")
		);

		this.state = true;
	}

	closeProductCard() {
		unmountComponentAtNode(document.getElementById("modal"));
		this.stores.productCardState.reset();
		this.state = false;
	}
}

export default ProductCardController;
