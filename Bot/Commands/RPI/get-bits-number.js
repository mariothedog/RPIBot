const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");

module.exports = {
	name: "get-bits-number",
	description: "Returns the decimal number based on the bits activated",
	async execute(message) {
		const {
			num_bits,
			gpio_bit_pins,
		} = require("../../user-config.json");

		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});

		let number = 0;
		for (let i = 0; i < num_bits; i++) {
			const bitPin = gpio_bit_pins[i];
			if (pinValues[bitPin]) {
				number += 2 ** i;
			}
		}

		message.reply(`The bits number is ${number}!`);

		return true;
	},
};