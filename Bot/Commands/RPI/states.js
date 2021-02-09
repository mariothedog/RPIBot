const Discord = require("discord.js");
const util = require("../../util.js");
const gpioPins = require("../../../Web Server/static/gpio_pins.json");

module.exports = {
	name: "states",
	description: "Returns the state of every GPIO pin",
	async execute(message) {
		const pinValues = await util.getPinValues();

		const height = 14;
		const embed = new Discord.MessageEmbed()
			.setColor("#bc1142")
			.setTitle("GPIO Pin States")
			.addFields({
				name: "\u200B",
				value: formatPins(gpioPins.slice(0, height), pinValues),
				inline: true,
			}, {
				name: "\u200B",
				value: formatPins(gpioPins.slice(height), pinValues),
				inline: true,
			})
			.setTimestamp();

		message.channel.send(embed);
		return true;
	},
};

function formatPins(pins, pinValues) {
	return pins.map(p => `**${p}** - ${pinValues[p]}`);
}