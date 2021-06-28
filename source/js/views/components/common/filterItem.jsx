import React, { Component } from "react";
import _ from "lodash";
import { BrandParser } from "~/services/parsers";
import ItemFilter from "@/itemFilter.json";

class FilterItem extends Component {
	constructor(props) {
		super(props);

		// Выбранные фильтры родительской категории этого элемента
		const allCategorySelected =
			props.stores.selectedFilters.getStore[props.category];
		this.state = {
			active: _.includes(allCategorySelected, props.data),
			category: props.category
		};
	}

	componentWillReceiveProps(props) {
		const allCategorySelected =
			props.stores.selectedFilters.getStore[props.category];
		this.state = {
			active: _.includes(allCategorySelected, props.data),
			category: props.category
		};
	}

	chooseFilter(){
		const data = {};
		data[this.state.category] = [this.props.data]

		this.props.stores.catalogEvent.set({
			type: "append",
			value: data
		});
	}
	//
	resetFilter(){
		const data = {};
		data[this.state.category] = [this.props.data]

		this.props.stores.catalogEvent.set({
			type: "detach",
			value: data
		});
	}

	toogleClick() {
		if(this.state.active) this.resetFilter();
		else this.chooseFilter();

		this.setState({
			active: this.state.active === false
		});
	}

	getClass() {
		return this.state.active ? "active" : "";
	}

	getInner() {
		switch (this.state.category) {
			case "BRAND":
				return this.getBrand();
			case "VID_TOVARA_UA":
				return this.getProductType();
			default:
				return this.getCommon();
		}
	}

	getBrand() {
		const brandPath = this.state.active
			? "./build/img/brand/white/"
			: "./build/img/brand/black/";
		return <img src={`${brandPath}${BrandParser(this.props.data)}.png`} />;
	}

	getProductType() {
		const goodsTypePath = this.state.active
			? "./build/img/goodsType/white/"
			: "./build/img/goodsType/black/";
		return (
			<div>
				<img src={`${goodsTypePath}${ItemFilter[_.capitalize(this.props.data)]}.png`} />
				<p>
					{_.capitalize(this.props.data)}
				</p>
			</div>
		);
	}

	getCommon() {
		return (
			<p>
				{this.props.data}
			</p>
		);
	}

	render() {
		return (
			<div
				className={this.getClass()}
				data-filter-item={this.props.data}
				onClick={this.toogleClick.bind(this)}
			>
				{this.getInner()}
			</div>
		);
	}
}

export default FilterItem;
