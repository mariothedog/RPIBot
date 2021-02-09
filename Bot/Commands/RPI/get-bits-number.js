const util = require("../../util.js");

module.exports = {
	name: "get-bits-number",
	description: "Returns the decimal number based on the bits activated",
	async execute(message) {
		const number = await util.getBitsNumber();
		message.reply(`The bits number is ${number}!`);

		return true;
	},
};