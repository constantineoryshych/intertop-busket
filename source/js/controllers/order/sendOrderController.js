import request from "browser-request";
import moment from "moment";
import _ from "lodash";
import Config from "@/config.json";
import { innerNumberGenerator } from "~/services/generators";
import Request from "~/services/request";

class SendOrderController {
	constructor(options) {
		this.stores = options.stores;
	}

	async init() {
		this.stores.orderSend.subscribe(this.subscribe.bind(this));
	}

	subscribe() {
		const state = this.stores.orderSend.getStore;
		if (state.status !== "ready") return;
		if (this.getOrderType() === "delivery") this.send();
		else this.sendReserve();
		this.stores.productCardType.set({ type: "thank" });
	}

	getOrderType() {
		return this.stores.orderType.getStore.type;
	}

	getTarget() {
		const deliveryType = this.stores.orderDeliveryType.getStore.type;
		return deliveryType === "address" ? "address" : this.stores.orderStore.getStore.store;
	}

	getSeller() {
		const number = this.stores.orderSeller.getStore.number;
		return _.size(number) < 1 ? null : number;
	}

	// eslint-disable-next-line
	getPrice() {
		try {
			const price = this.stores.productCardState.getStore.item.PRICE_ACTION;
			return typeof price === "undefined" ? 0 : price;
		} catch (e) {
			return 0;
		}
	}

	getPhone() {
		return `+380${this.stores.orderPhone.getStore.number}`;
	}

	collectQuery() {
		const data = {};
		data[this.getOrderType()] = this.getTarget();
		const innerCode = innerNumberGenerator();
		this.stores.orderCode.set({ code: innerCode });
		_.assign(data, {
			phone: this.getPhone(),
			model: this.stores.productCardState.getStore.key,
			size: this.stores.orderSize.getStore.size,
			price: this.getPrice(),
			time: moment(new Date()).format("DD.MM.YYYY:HH:mm:ss"),
			innerNumber: innerCode,
			target: Config.main.shopCode,
			sellerCode: this.getSeller()
		});

		const result = _.reduce(
			data,
			(res, val, key) => {
				const add = `${key}=${val}`;
				return _.size(res) < 1 ? `${add}` : `${res};${add}`;
			},
			""
		);

		return result;
	}

	send() {
		request(
			{
				method: "GET",
				url: `${Config.main.restURL}?ORDERS?${this.collectQuery()}`
			},
			this.responseHandler.bind(this)
		);
	}

	sendReserve() {
		const model = this.stores.productCardState.getStore.key;
		const size = this.stores.orderSize.getStore.size;

		const barcode = _.find(this.stores.sizes.getStore, val => val.MTICODE === Number(model) && val.SIZE === size);

		if (!barcode) {
			return this.stores.orderSend.set({
				status: "done",
				answer: null,
				error: `Не вдалося визначити SIZECODE`
			});
		}

		const sizeCode = model + "#" + barcode.SIZECODE;
		const phone = this.getPhone();
		const seller = this.getSeller();
		
		let target;
		try{
			target = this.stores.orderStore.getStore.store;
		} catch(err) {
			// --
		}

		Request.getApiReserve(sizeCode, phone, target, seller)
			.then(result => {
				try {
					const res = JSON.parse(result);
					this.stores.orderCode.set({ code: res.data.number });
				} catch (err) {
					console.log(err.message, result);
				}

				this.stores.orderSend.set({
					status: "done",
					answer: result,
					error: null
				});
			})
			.catch(err => {
				console.log("Error while reserve: ", err);
				this.stores.orderSend.set({
					status: "done",
					answer: null,
					error: err
				});
			});
	}

	responseHandler(err, res, body) {
		if (err) {
			this.stores.orderSend.set({
				status: "done",
				answer: body,
				error: err
			});
		}

		if (res.statusCode === 200)
			this.stores.orderSend.set({
				status: "done",
				answer: body,
				error: null
			});
		else
			this.stores.orderSend.set({
				status: "done",
				answer: body,
				error: `Status code: ${res.statusCode}`
			});
	}
}

export default SendOrderController;
