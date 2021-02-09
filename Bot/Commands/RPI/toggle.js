const util = require("../../util.js");

module.exports = {
	name: "toggle",
	usage: "<GPIO pin number>",
	description: "Toggles the GPIO pin's state",
	async execute(message, args) {
		const pinNum = parseInt(args[0]);
		if (!pinNum) {
			return false;
		}

		const pinValues = await util.getPinValues();

		const currentValue = pinValues[pinNum];
		if (currentValue === undefined) {
			message.reply("Please enter a valid GPIO pin number!");
			return true;
		}

		const writeValue = currentValue ? 0 : 1;
		util.setGPIOPin(pinNum, writeValue);

		return true;
	},
};