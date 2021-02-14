const util = require("../../util");

module.exports = {
	name: "display-bits-config",
	description: "Display the bits config",
	async execute(message, _args, prefixUsed) {
		const gpioBitPins = util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}config-bits first!`);
			return true;
		}
		const gpioBitPinsFormatted = Array.prototype.join.call(gpioBitPins, ", ");
		message.reply(`\n**GPIO Bit Pins:** ${gpioBitPinsFormatted}`);
		return true;
	},
};