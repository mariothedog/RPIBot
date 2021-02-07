module.exports = {
	name: "display-bits-config",
	description: "Display the bits config",
	async execute(message) {
		const userConfig = require("../../user-config.json");
		message.reply(`\nNumber of Bits: ${userConfig["num_bits"]}\nGPIO Bit Pins: ${userConfig["gpio_bit_pins"]}`);
		return true;
	},
};