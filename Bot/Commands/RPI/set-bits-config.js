const fs = require("fs");
const util = require("../../util.js");

module.exports = {
	name: "set-bits-config",
	usage: "<GPIO Number for bit 0> <... up to bit n-1>",
	description: "Configure the GPIO numbers for each bit (0-n)",
	async execute(message, args) {
		const gpioNums = args.map(Number);
		const pinValues = await util.getPinValues();
		if (gpioNums.some(p => pinValues[p] === undefined)) {
			message.reply("All GPIO pin numbers must be valid!");
			return true;
		}

		const userConfig = require("../../user-config.json");
		userConfig["gpio_bit_pins"] = gpioNums;

		fs.writeFileSync("Bot/user-config.json", JSON.stringify(userConfig, null, 4));

		message.reply("Bits successfully configured!");

		return true;
	},
};