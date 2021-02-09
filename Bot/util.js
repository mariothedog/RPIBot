const axios = require("axios");
const {
	http_server_address,
} = require("../config.json");

module.exports = {
	async setGPIOPin(pinNum, writeValue) {
		await axios.post(http_server_address, {
			gpioPin: pinNum,
			writeValue: writeValue,
		}).catch((error) => {
			console.log(error);
		});
	},

	async getPinValues() {
		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});
		return pinValues;
	},
};