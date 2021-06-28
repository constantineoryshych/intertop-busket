import _ from "lodash";
import { Component } from "react";

class ComponentStateStore extends Component {
	constructor(options) {
		super(options.props);
		this.storesRules = options.stores;

		this.state = {};
		this.unsubscribe = [];

		this.initState();
	}

	initState() {
		const data = {};

		_.map(this.storesRules, rules => {
			this.subscribe(rules.store);

			_.map(rules.fields, field => {
				data[field] = this.props.stores[rules.store].getStore[field];
			});
		});

		this.state = data;
	}

	subscribe(store) {
		this.unsubscribe[store] = this.props.stores[store].subscribe(() => {
			this.getNewState(store);
		});
	}

	getNewState(store) {
		const fields = this.storesRules.filter(el => el.store === store)[0].fields;
		const newState = this.props.stores[store].getStore;

		this.isFieldChange(fields, newState);
	}

	isFieldChange(fields, newState) {
		const data = {};

		_.map(fields, field => {
			if (_.has(newState, field)) {
				if (
					typeof newState[field] !== "undefined" &&
					newState[field] !== this.state[fields]
				) {
					data[field] = newState[field];
				}
			}
		});

		this.setState(data);
	}

	componentWillUnmount() {
		_.map(this.storesRules, rules => {
			this.unsubscribe[rules.store]();
		});
	}
}

export default ComponentStateStore;
