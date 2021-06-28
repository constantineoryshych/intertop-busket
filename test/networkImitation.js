import io from "socket.io";
import http from "http";
import express from "express";
import _ from "lodash";
import fs from "fs";

class NetworkImitation {
	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.ip = `localhost`;
		this.io = null;

		this.chunks = {};
	}

	init() {
		return new Promise((resolve, reject) => {
			this.start()
				.then(() => {
					this.initMiddleware();
					this.initView();
					this.initGetHandlers();
				})
				.then(this.checkDataFiles.bind(this))
				.then((this.io = io(this.server)))
				.then(this.handlers.bind(this))
				.then(resolve)
				.catch(reject);
		});
	}

	start() {
		return new Promise(resolve => {
			this.server.listen(2222, this.ip, () => {
				global.console.log(
					`${new Date()} Server ${this.ip} is listening on port 2222`
				);
				resolve();
			});
		});
	}

	initMiddleware() {
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Credentials", true);
			res.header("Access-Control-Allow-Methods", "GET, POST");
			res.header("Access-Control-Allow-Headers", "Cache-Control");
			next();
		});
	}

	initView() {
		this.app.use("/existent", express.static("./test/existent"));
	}

	initGetHandlers() {
		this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));

		this.app.get("/", (req, res) => {
			const param = _.split(req.originalUrl, `?`);
			console.log(param)
			if(param[1] === "RESTS") {
				const answer = {};
				answer[param[2]] = {"38":{"MITIF01":{"QTY":1},"MITIN01":{"QTY":6},"MITNI01":{"QTY":1},"MITHA01":{"QTY":2},"MITKR03":{"QTY":2},"MITDP05":{"QTY":4},"MITVN01":{"QTY":2},"MITHM02":{"QTY":5},"MITCV01":{"QTY":4},"MITHA03":{"QTY":3},"MITKV04":{"QTY":3},"MITKV08":{"QTY":8},"MITKV05":{"QTY":3},"MITKV27":{"QTY":5},"MITOD04":{"QTY":3},"MITKV11":{"QTY":5}},"41":{"MITIF01":{"QTY":1},"MITNI01":{"QTY":1},"MITHM02":{"QTY":1},"MITCV01":{"QTY":1},"MITIN01":{"QTY":2},"MITKV08":{"QTY":1},"MITKV05":{"QTY":1},"MITKV11":{"QTY":1}},"38,5":{"MITIF01":{"QTY":1},"MITVN01":{"QTY":1},"MITHM02":{"QTY":1},"MITIN01":{"QTY":1}},"37":{"MITNI01":{"QTY":1},"MITHA01":{"QTY":1},"MITCR02":{"QTY":1},"MITKV05":{"QTY":1},"MITOD04":{"QTY":1}},"39":{"MITNI01":{"QTY":2},"MITDP05":{"QTY":1},"MITHM02":{"QTY":1},"MITCV01":{"QTY":2},"MITIN01":{"QTY":1},"MITKV08":{"QTY":1}},"36":{"MITHA01":{"QTY":1},"MITIN01":{"QTY":2}},"37,5":{"MITDP05":{"QTY":1},"MITHM02":{"QTY":1},"MITCV01":{"QTY":1},"MITIN01":{"QTY":2},"MITKV05":{"QTY":1},"MITOD04":{"QTY":1}},"41,5":{"MITKV08":{"QTY":2}}};
				res.send(answer)
			} else res.send("not supported");
		})
	}

	handlers() {
		this.io.on("connection", socket => {
			socket.on("disconnect", () => {
				global.console.log("disconnect");
			});

			socket.on("INTRO", message => { // eslint-disable-line
				socket.emit("CHUNKS", this.chunks);
			});
		});
	}

	checkDataFiles() {
		return new Promise((resolve, reject) => {
			fs.readdir("./test/existent/db/", (err, files) => {
				try {
					if (err) throw err;
					_.forEach(files, file => {
						const words = _.words(file);
						this.chunks[words[1]] = words[2];
					});
					resolve();
				} catch (e) {
					reject(`LaunchChunks.checkDataFiles: ${e}`);
				}
			});
		});
	}
}

const paperDoll = new NetworkImitation();
paperDoll.init();
