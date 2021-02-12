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

	getGPIOBitPins() {
		return require("./user-config.json").gpio_bit_pins;
	},

	getNumBits() {
		return this.getGPIOBitPins().length;
	},

	getMaxBitsNum() {
		return 2 ** this.getNumBits() - 1;
	},

	async setBit(bitNum, bitValue) {
		const gpioBitPins = this.getGPIOBitPins();
		const pinNum = gpioBitPins[bitNum];
		await this.setGPIOPin(pinNum, bitValue);
	},

	async getBitsNumber() {
		const gpioBitPins = require("./user-config.json").gpio_bit_pins;
		const pinValues = await this.getPinValues();

		let number = 0;
		for (let i = 0; i < gpioBitPins.length; i++) {
			const bitPin = gpioBitPins[i];
			if (pinValues[bitPin]) {
				number += 2 ** i;
			}
		}
		return number;
	},

	async setBitsNumber(number) {
		let bitNum = 0;
		while (number >= 1) {
			const bitValue = number % 2;
			await this.setBit(bitNum, bitValue);
			number = Math.floor(number / 2);
			bitNum++;
		}

		for (bitNum; bitNum < this.getNumBits(); bitNum++) {
			await this.setBit(bitNum, 0);
		}
	},
};