const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");

module.exports = {
	name: "set-bit",
	usage: "<Bit number> <Value (0 or 1)>",
	description: "Set the bit's value",
	async execute(message, args, prefixUsed) {
		const {
			num_bits,
			gpio_bit_pins,
		} = require("../../user-config.json");

		if (!num_bits || !gpio_bit_pins) {
			message.reply(`Please run ${prefixUsed}config-bits first!`);
			return true;
		}

		const bitNum = parseInt(args[0]);
		const bitValue = parseInt(args[1]);
		if (isNaN(bitNum) || isNaN(bitValue)) {
			return false;
		}

		if (bitNum < 0 || bitNum >= num_bits) {
			message.reply(`The bit number is not within the range configured: 0 - ${num_bits - 1}`);
			return true;
		}

		if (bitValue != 0 && bitValue != 1) {
			message.reply("The bit value must be 0 or 1!");
			return true;
		}

		this.setBit(bitNum, bitValue, (error) => {
			console.log(error);
			message.reply("An error occurred!");
		});

		return true;
	},

	setBit(bitNum, bitValue, errorHandler) {
		const {
			gpio_bit_pins,
		} = require("../../user-config.json");

		const pinNum = gpio_bit_pins[bitNum];

		let errorOccurred = false;
		axios.post(http_server_address, {
			gpioPin: pinNum,
			writeValue: bitValue,
		}).catch(error => {
			errorOccurred = true;
			errorHandler(error);
		});
		return errorOccurred;
	},
};