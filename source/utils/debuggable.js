"use strict";

import debug from "debug";
import util from "util";
import config from "./../config/config";


export default class Debuggable {

	displayName = "Debuggable";
	config = {};
	_client = null;

	constructor(isDebuggable) {
		this.displayName = this.constructor.name.slice(0, -3).toLowerCase();
		this.config = config[process.env.NODE_ENV][this.displayName];

		if (isDebuggable) {
			this.log = (...args) =>
				debug(`connect:${this.displayName}`)(...args.map(arg =>
					util.inspect(arg, {depth: 10, colors: true})));
		} else {
			this.log = () => null;
		}
	}

	get client() {
		if (!this._client) {
			this._client = this.getClient();
		}
		return this._client;
	}

	getClient() {
		throw new Error("getClient should be override");
	}
}
