import React, { Component, createElement } from "react";
import Swipeable from "react-swipeable";
import _ from "lodash";
import Config from "@/config.json";

class ListSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: props.list,
			perPage: parseInt(props.perPage),
			curPage: 1,
			maxPage: Math.ceil(props.list.length / parseInt(props.perPage)),
			orientation: props.orientation,
			item: props.items,
			repage: props.repage ? props.repage : false
		};
	}

	componentWillReceiveProps(props) {
		const newMax = Math.ceil(props.list.length / parseInt(props.perPage));
		this.setState({
			perPage: parseInt(props.perPage),
			curPage:
				this.state.repage || newMax < this.state.curPage
					? 1
					: this.state.curPage,
			list: props.list,
			maxPage: newMax
		});
	}

	isButtonNextNeedHide() {
		return this.state.curPage >= this.state.maxPage ? "hide" : "";
	}

	isButtonPrevNeedHide() {
		return this.state.curPage <= 1 ? "hide" : "";
	}

	prevPage() {
		if (this.state.curPage === 1) return;
		this.setState({ curPage: this.state.curPage - 1 });
	}

	nextPage() {
		if (this.state.curPage >= this.state.maxPage) return;
		this.setState({ curPage: this.state.curPage + 1 });
	}

	getItems() {
		const endItem = this.state.curPage * this.state.perPage;
		let startItem = endItem - this.state.perPage;

		const list = [];

		while (startItem < endItem) {
			const param = _.assign({}, this.props.itemsParam, {
				key: startItem,
				data: this.state.list[startItem]
			});
			if (this.state.list.length > startItem)
				list.push(createElement(this.state.item, param, null));
			startItem += 1;
		}

		return list;
	}

	getSwipeEventListeners() {
		let result = {};

		if (this.state.orientation === "horizontal")
			result = {
				onSwipingRight: this.prevPage.bind(this),
				onSwipingLeft: this.nextPage.bind(this)
			};
		else
			result = {
				onSwipingUp: this.nextPage.bind(this),
				onSwipingDown: this.prevPage.bind(this)
			};

		return result;
	}

	isSwiped() {
		return Config.orientation.screen === "hori"
			? {}
			: this.getSwipeEventListeners();
	}

	drawItems() {
		return createElement(
			Swipeable,
			_.assign(
				{
					className: "list",
					"data-page": this.state.curPage
				},
				this.isSwiped()
			),
			_.map(this.getItems(), el => el)
		);
	}

	arrowPrevClass() {
		return this.state.orientation === "vertical" ? "up" : "left";
	}

	arrowNextClass() {
		return this.state.orientation === "vertical" ? "down" : "right";
	}

	isFilterList() {
		return this.props.filterCategory ? this.props.filterCategory : false;
	}

	componentDidUpdate() {
		if (typeof this.props.onChange === "undefined") return;
		this.sendSelfStateToParent();
	}

	sendSelfStateToParent() {
		this.props.onChange(this.state);
	}

	render() {
		return (
			<div
				className={this.props.className}
				data-filter-category={this.isFilterList()}
				data-orientation={this.state.orientation}
				data-grid={this.state.perPage}
			>
				<div
					className={`button arrow-${this.arrowPrevClass()} ${this.isButtonPrevNeedHide()}`}
					onClick={this.prevPage.bind(this)}
				/>
				{this.drawItems()}
				<div
					className={`button arrow-${this.arrowNextClass()} ${this.isButtonNextNeedHide()}`}
					onClick={this.nextPage.bind(this)}
				/>
			</div>
		);
	}
}

export default ListSlider;
