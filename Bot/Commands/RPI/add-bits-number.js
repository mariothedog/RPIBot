const util = require("../../util.js");
const setBitsConfig = require("./set-bits-config");

module.exports = {
	name: "add-bits-number",
	usage: "<Number (n > 0)> <Should transition to number (true/false)> <Transition increment delay (ms)>",
	description: "Adds the number to the binary display",
	async execute(message, args, prefixUsed) {
		const gpioBitPins = util.getGPIOBitPins();
		if (!gpioBitPins) {
			message.reply(`Please run ${prefixUsed}${setBitsConfig.name} first!`);
			return true;
		}

		let number = parseInt(args[0]);
		if (isNaN(number)) {
			return false;
		}
		else if (number <= 0) {
			message.reply("The number must be greater than 0!");
			return true;
		}

		let shouldTransition = args[1];
		if (shouldTransition) {
			shouldTransition = shouldTransition.toLowerCase() === "true";
		}
		else {
			shouldTransition = false;
		}

		const currentNumber = await util.getBitsNumber();
		const maxNum = util.getMaxBitsNum();

		if (currentNumber == maxNum) {
			message.reply("It is already set to the biggest number possible!");
			return true;
		}

		let newNumber = currentNumber + number;

		if (newNumber > maxNum) {
			message.reply("There aren't enough bits available to display that number fully! " +
				`Displaying ${maxNum} instead!`);
			number -= newNumber - maxNum;
			newNumber = maxNum;
		}

		if (shouldTransition) {
			let transitionIncrementDelay = parseInt(args[2]);
			if (isNaN(transitionIncrementDelay)) {
				transitionIncrementDelay = 0;
			}
			message.reply("Currently transitioning ...");
			await transitionToBitNumber(currentNumber, newNumber, transitionIncrementDelay);
		}
		else {
			await util.setBitsNumber(newNumber);
		}

		message.reply(`${number} successfully added to ${currentNumber} to make ${newNumber}!`);

		return true;
	},
};

async function transitionToBitNumber(currentNumber, targetNumber, delay) {
	if (currentNumber == targetNumber) {
		return;
	}
	await util.setAsyncTimeout(async function() {
		currentNumber++;
		await util.setBitsNumber(currentNumber);
		await transitionToBitNumber(currentNumber, targetNumber, delay);
	}, delay);
}