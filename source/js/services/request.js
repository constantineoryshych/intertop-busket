import request from "browser-request";
import _ from "lodash";
import Config from "@/config.json";
import City from "@/cityDecode.json";

class SendRequest {
	static getApi(options) {
		const urlString = `${Config.main.restURL}?RESTS?${options.key}`;
		const params = { method: "GET", url: urlString, json: true };

		return new Promise((resolve, reject) => {
			request(params, (er, response, body) => {
				if (er) reject(`Ошибка получения остатков ${options.key}`);
				else if (response.statusCode !== 200) reject(`Ошибка получения остатков ${options.key}`);
				else if (response.statusCode === 200) {
					if (typeof body.RESTS !== "undefined" && _.includes(body.RESTS.RESULT, "NO RESTS ON MODEL"))
						reject(`Данные об остатках отсутствуют ${options.key}`);
					else resolve(body);
				}
			});
		});
	}

	static getApiReserve(sizecode, phone, target, seller = undefined) {
		const token = "5bdf1fd070cdb1ed02d535c5710e5b9ee9a11785";
		const url = "https://api.intertop.ua/api/v2/reserve/?access_token=" + token;
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		return new Promise((resolve, reject) => {
			xhr.addEventListener("readystatechange", function() {
				if (this.readyState === this.DONE) {
					if (this.status !== 200) reject(this.responseText);
					else resolve(this.responseText);
				}
			});

			xhr.addEventListener("error", function() {
				reject(`StatusCode: ${this.status}; Response: ${this.responseText}`);
			});

			xhr.open("POST", url, true);
			xhr.setRequestHeader("authorization", "Basic cGFuZWw6cGFuZWw=");

			const body = `{"cityID":"${
				City[Config.loc.cityLocation].id
			}","sizeCode":"${sizecode}","shopJde":"${target}","phone":"${phone}", "panelSeller": "${seller}"}`;
			xhr.send(body);
		});
	}
}

export default SendRequest;
