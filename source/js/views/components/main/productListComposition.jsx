import { createElement } from "react";
// import Config from "@/config.json";
import ComponentStateStore from "~/views/components/common/componentStateStore.jsx";
import ListSlider from "~/views/components/common/listSlider.jsx";
import ProductListItem from "~/views/components/common/productListItem.jsx";

class ProductListComposition extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "mainViewGrid",
					fields: ["grid"]
				}
			]
		};
		super(options);

		this.sub();

		this.onChange({ perPage: this.state.grid, curPage: 1 });
	}

	sub(){
		this.un = this.props.stores.productList.subscribe(() => {
			this.setState({list: this.props.stores.productList.getStore})
		})
	}

	onChange(state) {
		const end = state.perPage * state.curPage;
		const start = end - state.perPage + 1;
		const max = this.props.stores.productListSize.getStore.size;

		this.props.stores.mainViewed.set({ cnt: `${start}-${end > max ? max : end}` });
	}

	render() {
		const param = {
			className: "catalog-item-wrapper",
			perPage: this.state.grid,
			orientation: "horizontal",
			repage: true,
			list: this.state.list || this.props.stores.productList.getStore,
			items: ProductListItem,
			itemsParam: { stores: this.props.stores, history: this.props.history },
			onChange: this.onChange.bind(this)
		};

		// Config.orientation.screen == "vert"
		// 	? (param.perPage = 9)
		// 	: (param.perPage = 10);

		return createElement(ListSlider, param);
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.un();
	}
}

export default ProductListComposition;
