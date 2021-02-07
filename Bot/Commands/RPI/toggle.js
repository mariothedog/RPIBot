const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");

module.exports = {
	name: "toggle",
	usage: "<GPIO pin number>",
	description: "Toggles the GPIO pin's state",
	async execute(message, args) {
		const pinNum = args[0];
		if (!pinNum) {
			return false;
		}

		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});

		const currentValue = pinValues[pinNum];
		if (currentValue === undefined) {
			message.reply("Please enter a valid GPIO pin number!");
			return true;
		}

		const writeValue = currentValue ? 0 : 1;
		await axios.post(http_server_address, {
			gpioPin: parseInt(pinNum),
			writeValue: writeValue,
		}).then(() => {
			message.reply(`GPIO pin number ${pinNum} was successfully written to with the value ${writeValue}`);
		}).catch((error) => {
			console.error(error);
			message.reply("An error occurred!");
		});

		return true;
	},
};
