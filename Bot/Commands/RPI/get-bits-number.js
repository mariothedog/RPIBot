const util = require("../../util.js");
const setBitsConfig = require("./set-bits-config");

module.exports = {
	name: "get-bits-number",
	description: "Returns the decimal number based on the bits activated",
	async execute(message, _args, prefixUsed) {
		const gpioBitPins = util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}${setBitsConfig.name} first!`);
			return true;
		}

		const number = await util.getBitsNumber();
		message.reply(`The bits number is ${number}!`);

		return true;
	},
};