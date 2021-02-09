const fs = require("fs");
const util = require("../../util.js");

module.exports = {
	name: "set-bits-config",
	usage: "<Number of bits (n > 0)> <GPIO Number for bit 0> <... up to bit n-1>",
	description: "Configure the GPIO numbers for each bit (0-n)",
	async execute(message, args) {
		const numBits = parseInt(args[0]);
		if (numBits <= 0) {
			return false;
		}

		const gpioNums = args.slice(1).map(Number);
		if (gpioNums.length != numBits) {
			return false;
		}

		const pinValues = await util.getPinValues();

		if (gpioNums.some(p => pinValues[p] === undefined)) {
			message.reply("All GPIO pin numbers must be valid!");
			return true;
		}

		const userConfig = require("../../user-config.json");
		userConfig["num_bits"] = numBits;
		userConfig["gpio_bit_pins"] = gpioNums;

		fs.writeFileSync("Bot/user-config.json", JSON.stringify(userConfig, null, 4));

		message.reply("Bits successfully configured!");

		return true;
	},
};