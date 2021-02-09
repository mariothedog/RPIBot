const axios = require("axios");
const {
	http_server_address,
} = require("../config.json");

module.exports = {
	async getPinValues() {
		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});
		return pinValues;
	},

	async setGPIOPin(pinNum, writeValue) {
		await axios.post(http_server_address, {
			gpioPin: pinNum,
			writeValue: writeValue,
		});
	},

	async setBit(bitNum, bitValue) {
		const {
			gpio_bit_pins,
		} = require("./user-config.json");

		const pinNum = gpio_bit_pins[bitNum];
		await this.setGPIOPin(pinNum, bitValue);
	},

	async getBitsNumber() {
		const {
			num_bits,
			gpio_bit_pins,
		} = require("./user-config.json");

		const pinValues = await this.getPinValues();

		let number = 0;
		for (let i = 0; i < num_bits; i++) {
			const bitPin = gpio_bit_pins[i];
			if (pinValues[bitPin]) {
				number += 2 ** i;
			}
		}
		return number;
	},
};