const util = require("../../util.js");
const setBitsConfig = require("./set-bits-config");

module.exports = {
	name: "set-bits-number",
	usage: "<Number (n > 0)>",
	description: "Sets the corresponding bits based on the number in binary",
	async execute(message, args, prefixUsed) {
		const gpioBitPins = await util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}${setBitsConfig.name} first!`);
			return true;
		}

		const number = parseInt(args[0]);
		if (isNaN(number)) {
			return false;
		}
		else if (number < 0) {
			message.reply("The number must be greater than or equal to 0!");
			return true;
		}

		if (number > util.getMaxBitsNum()) {
			message.reply("There aren't enough bits available to display that number!");
			return true;
		}

		await util.setBitsNumber(number);
		message.reply(`Bits number successfully set to ${number}!`);

		return true;
	},
};