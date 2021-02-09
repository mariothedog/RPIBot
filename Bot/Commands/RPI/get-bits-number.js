const util = require("../../util.js");

module.exports = {
	name: "get-bits-number",
	description: "Returns the decimal number based on the bits activated",
	async execute(message) {
		const {
			num_bits,
			gpio_bit_pins,
		} = require("../../user-config.json");

		const pinValues = await util.getPinValues();

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