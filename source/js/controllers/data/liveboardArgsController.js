import Config from "@/config.json";
import ipGetInfo from "@/ipGetInfo.json";
import _ from "lodash";

export default class LiveboardArgsHandler {
	constructor() {
		this.exception = false;
		this.args = null;
		this.rest = null;
		this.ip = null;
		this.default = ["192.168.10.3", "MITKV04", "KV", "http://194.169.238.50:7080/kvinto/in"]
	}

	init() {
		return new Promise(resolve => {
			this.applyParameters().then(() => {
				Config.network.host = this.args.host;
				Config.main.shopCode = this.args.shopCode;
				Config.loc.cityLocation = this.args.city;
				Config.main.restURL = this.rest;
				resolve();
			});
		});
	}

	webRTC() {
		return new Promise(resolve => {
			window.RTCPeerConnection =
				window.RTCPeerConnection ||
				window.mozRTCPeerConnection ||
				window.webkitRTCPeerConnection; // compatibility for firefox and chrome
			// eslint-disable-next-line one-var
			const pc = new RTCPeerConnection({ iceServers: [] }),
				noop = () => {};
			pc.createDataChannel(""); // create a bogus data channel
			pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
			pc.onicecandidate = ice => {
				// listen for candidate events
				if (!ice || !ice.candidate || !ice.candidate.candidate) return;
				// eslint-disable-next-line prefer-destructuring
				this.ip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
					ice.candidate.candidate
				)[1];
				pc.onicecandidate = noop;
				resolve(this.ip);
			};
		});
	}

	getIP(){
		const address = this.ip;
		return  _.split(address, ".");
	}

	regularStoreParam(){
	    const pars   = this.getIP();
	    const subnet = _.take(pars, 3);
	    return _.join(subnet, ".");		
    }

	exceptionCheck(ip){
		return new Promise(function(resolve,reject){
			    _.forEach(ipGetInfo, function(value, key) {
				 if (key == ip){
		            this.exception = true;
		            return
	        	 }
	        	  	resolve('success');
			}.bind(this));
		}.bind(this))
	}


	applyParameters() {
	    return new Promise(resolve => {
	        this.webRTC().then(() => {
	            let param;
	            if (Config.main.local === true) {
		                this.setParam(...this.default);
		                resolve();
	            } else {
	                this.exceptionCheck(this.ip).then(function(response) {
	                    param = (this.exception == true) ? ipGetInfo[this.ip] : ipGetInfo[this.regularStoreParam()];
	                    if (typeof param === "undefined") {
	                        this.setParam("10.10.1.50", "MITKV04", "KV", Config.main.restURL);
	                        resolve();
	                    } else {
	                        this.setParam(param.host, param.shopcode, param.city, Config.main.restURL);
	                        resolve();
	                    }
	                }.bind(this));
	            }
	        });
	    });
	}

	setParam(hostName, shop, cityLoc, restUrl) {
		return new Promise(resolve => {
			this.args = {
				host: hostName,
				shopCode: shop,
				city: cityLoc
			};
			this.rest = restUrl;
			resolve();
		});
	}
}
