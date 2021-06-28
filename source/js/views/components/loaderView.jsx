import React from "react";
import ComponentStateStore
	from "~/views/components/common/componentStateStore.jsx";

class LoaderView extends ComponentStateStore {
	constructor(propsData) {
		const options = {
			props: propsData,
			stores: [
				{
					store: "loaderProgress",
					fields: ["percentage", "err"]
				}
			]
		};
		super(options);

		this.stores = propsData.stores;
	}

	circleDom() {
		const r = (100 - this.state.percentage) / 100 * (Math.PI * (90 * 2));
		return (
			<div id="cont" data-pct="20">
				<h4><span>{this.state.percentage}</span>%</h4>
				<svg
					id="svg"
					width="200"
					height="200"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						r="90"
						cx="100"
						cy="100"
						fill="transparent"
						strokeDasharray="565.48"
						strokeDashoffset="0"
					/>
					<circle
						id="bar"
						r="90"
						cx="100"
						cy="100"
						fill="transparent"
						strokeDasharray="565.48"
						strokeDashoffset={r}
					/>
				</svg>
			</div>
		);
	}

	errorMessage() {
		const err = typeof this.state.err === "string" ? this.state.err : "Сталася непередбачувана помилка.";

		return (
			<div className="error-message">
				<h2>{err}</h2>
				<h3>{this.props.lang.text["loader-contact"]}</h3>
			</div>
		);
	}

	render() {
		return (
			<div id="load-screen">
				<div className="wrapper">
					{/*
          <p>{this.state.step}</p>
          */}
					<h1>{this.props.lang.title.loader}</h1>
					<p>{this.props.lang.text.loader}</p>
					{this.state.err == null ? this.circleDom() : this.errorMessage()}
				</div>
			</div>
		);
	}
}

export default LoaderView;
