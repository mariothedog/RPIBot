const fs = require("fs");
const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");
const userConfig = fs.existsSync("../../user-config.json") ?
	require("../../user-config.json") : {};

module.exports = {
	name: "config-bits",
	usage: "<Num bits (n > 0)> <GPIO Number for bit 0> <... up to bit n-1>",
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

		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});

		if (gpioNums.some(p => pinValues[p] === undefined)) {
			message.reply("All GPIO pin numbers must be valid!");
			return true;
		}

		userConfig["num_bits"] = numBits;
		userConfig["gpio_bit_pins"] = gpioNums;

		fs.writeFileSync("Bot/user-config.json", JSON.stringify(userConfig, null, 4));

		return true;
	},
};