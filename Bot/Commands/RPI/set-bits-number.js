const setBit = require("./set-bit.js");

module.exports = {
	name: "set-bits-number",
	usage: "<Number (n > 0)>",
	description: "Sets the corresponding bits based on the number in binary",
	async execute(message, args) {
		let number = parseInt(args[0]);
		if (isNaN(number)) {
			return false;
		}
		else if (number < 0) {
			message.reply("The number must be greater than or equal to 0!");
			return true;
		}

		const {
			num_bits,
		} = require("../../user-config.json");

		const maxNum = 2 ** num_bits - 1;
		if (number > maxNum) {
			message.reply("There aren't enough bits available to display that number!");
			return true;
		}

		function errorHandler(error) {
			console.log(error);
			message.reply("An error occurred!");
		}

		let bitNum = 0;
		while (number >= 1) {
			const bitValue = number % 2;
			if (setBit.setBit(bitNum, bitValue, errorHandler)) return true;
			number = Math.floor(number / 2);
			bitNum++;
		}

		for (bitNum; bitNum < num_bits; bitNum++) {
			if (setBit.setBit(bitNum, 0, errorHandler)) return true;
		}

		return true;
	},
};