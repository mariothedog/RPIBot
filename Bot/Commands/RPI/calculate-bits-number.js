const math = require("mathjs");
const util = require("../../util.js");
const setBitsConfig = require("./set-bits-config");

module.exports = {
	name: "calculate-bits-number",
	usage: "<Math Expression>",
	description: "Simplifies an expression and displays the binary result",
	async execute(message, args, prefixUsed) {
		const gpioBitPins = util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}${setBitsConfig.name} first!`);
			return true;
		}

		const expression = args.join("");
		if (!expression) {
			return false;
		}

		let result;
		try {
			// mathjs.evaluate is safer than eval
			result = math.evaluate(expression);
		}
		catch {
			return false;
		}

		if (result < 0) {
			message.reply(`The expression simplified to ${result} but negative numbers aren't allowed!`);
			return true;
		}
		else if (!Number.isInteger(result)) {
			message.reply(`The expression simplified to ${result} but non-integers aren't allowed!`);
			return true;
		}
		else if (result > util.getMaxBitsNum()) {
			message.reply(`The expression simplified to ${result} but there aren't enough bits available to display it!`);
			return true;
		}

		util.setBitsNumber(result);
		message.reply(`Bits number successfully set to ${result}!`);

		return true;
	},
};