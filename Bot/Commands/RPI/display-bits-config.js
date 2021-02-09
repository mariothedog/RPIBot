module.exports = {
	name: "display-bits-config",
	description: "Display the bits config",
	async execute(message) {
		const userConfig = require("../../user-config.json");
		const gpioBitPinsFormatted = Array.prototype.join.call(userConfig["gpio_bit_pins"], ", ");
		message.reply(`\n**GPIO Bit Pins:** ${gpioBitPinsFormatted}`);
		return true;
	},
};