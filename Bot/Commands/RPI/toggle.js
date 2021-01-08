const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");

module.exports = {
	name: "toggle",
	usage: "<GPIO pin number> <write value (0 or 1)>",
	description: "Writes to the GPIO pin specified",
	async execute(message, args) {
		const pinNum = args[0];
		let turnOn = args[1];
		if (!pinNum || !turnOn) {
			return false;
		}
		turnOn = turnOn.toLowerCase();

		let writeValue = 0;
		if (turnOn === "true") {
			writeValue = 1;
		}
		else if (turnOn !== "false") {
			writeValue = parseInt(turnOn);
			if (isNaN(writeValue)) {
				return false;
			}
		}

		let errorCaught = false;
		await axios.post(http_server_address, {
			gpioPin: parseInt(pinNum),
			writeValue: writeValue,
		}).catch((error) => {
			console.error(error);
			errorCaught = true;
		});

		if (errorCaught) {
			message.reply("An error occurred!");
		}
		else {
			message.reply(`GPIO pin number ${pinNum} was successfully written to with the value ${writeValue}`);
		}
		return true;
	},
};
