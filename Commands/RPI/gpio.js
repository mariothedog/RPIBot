const Gpio = require("onoff").Gpio;
const gpioPins = {
	2: new Gpio(2, "out"),
	3: new Gpio(3, "out"),
	4: new Gpio(4, "out"),
	17: new Gpio(17, "out"),
	27: new Gpio(27, "out"),
	22: new Gpio(22, "out"),
	10: new Gpio(10, "out"),
	9: new Gpio(9, "out"),
	11: new Gpio(11, "out"),
	5: new Gpio(5, "out"),
	6: new Gpio(6, "out"),
	13: new Gpio(13, "out"),
	19: new Gpio(19, "out"),
	26: new Gpio(26, "out"),
	14: new Gpio(14, "out"),
	15: new Gpio(15, "out"),
	18: new Gpio(18, "out"),
	23: new Gpio(23, "out"),
	24: new Gpio(24, "out"),
	25: new Gpio(25, "out"),
	8: new Gpio(8, "out"),
	7: new Gpio(7, "out"),
	12: new Gpio(12, "out"),
	16: new Gpio(16, "out"),
	20: new Gpio(20, "out"),
	21: new Gpio(21, "out"),
};


module.exports = {
	name: "gpio",
	aliases: ["toggle"],
	usage: "<GPIO pin number> <write value (0 or 1)>",
	description: "Writes to the GPIO pin specified",
	execute(message, args) {
		const pinNum = args[0];
		const turnOn = args[1];
		if (!pinNum || !turnOn) {
			return false;
		}
		
		if (!pinNum in gpioPins) {
			message.reply("Invalid GPIO pin number!")
			return true;
		}
		
		const gpio = gpioPins[pinNum];
		const writeValue = parseInt(turnOn) ? 1 : 0;
		gpio.writeSync(writeValue);
		message.reply(`GPIO pin number ${pinNum} was successfully written to with the value ${writeValue}`);
		return true;
	},
};
