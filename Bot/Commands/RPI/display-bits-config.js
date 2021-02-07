module.exports = {
	name: "display-bits-config",
	description: "Display the bits config",
	async execute(message) {
		const userConfig = require("../../user-config.json");
		const numBitsFormatted = userConfig["num_bits"];
		const gpioBitPinsFormatted = Array.prototype.join.call(userConfig["gpio_bit_pins"], ", ");
		const text = `\n**Number of Bits:** ${numBitsFormatted}\n**GPIO Bit Pins:** ${gpioBitPinsFormatted}`;
		message.reply(text);
		return true;
	},
};