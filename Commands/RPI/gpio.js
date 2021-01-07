const axios = require("axios");
const {
	rpi_server_address,
} = require("../../config.json");

module.exports = {
	name: "gpio",
	aliases: ["toggle"],
	usage: "<GPIO pin number> <write value (0 or 1)>",
	description: "Writes to the GPIO pin specified",
	async execute(message, args) {
		const pinNum = args[0];
		const turnOn = args[1];
		if (!pinNum || !turnOn) {
			return false;
		}

		let errorCaught = false;
		await axios.post(rpi_server_address, {
			gpioPin: parseInt(pinNum),
			writeValue: parseInt(turnOn),
		}).catch((error) => {
			console.error(error);
			errorCaught = true;
		});

		if (errorCaught) {
			message.reply("An error occurred!");
		}
		else {
			message.reply(`GPIO pin number ${pinNum} was successfully written to with the value ${turnOn}`);
		}
		return true;
	},
};
