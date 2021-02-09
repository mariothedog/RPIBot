const util = require("../../util");

module.exports = {
	name: "set-bit",
	usage: "<Bit number> <Value (0 or 1)>",
	description: "Set the bit's value",
	async execute(message, args, prefixUsed) {
		const gpioBitPins = await util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}config-bits first!`);
			return true;
		}

		const bitNum = parseInt(args[0]);
		const bitValue = parseInt(args[1]);
		if (isNaN(bitNum) || isNaN(bitValue)) {
			return false;
		}

		const numBits = gpioBitPins.length;
		if (bitNum < 0 || bitNum >= numBits) {
			message.reply(`The bit number is not within the range configured: 0 - ${numBits - 1}`);
			return true;
		}

		if (bitValue != 0 && bitValue != 1) {
			message.reply("The bit value must be 0 or 1!");
			return true;
		}

		await util.setBit(bitNum, bitValue);

		return true;
	},
};