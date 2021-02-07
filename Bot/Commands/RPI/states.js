const Discord = require("discord.js");
const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");
const gpioPins = require("../../../Web Server/static/gpio_pins.json");

module.exports = {
	name: "states",
	description: "Returns the state of every GPIO pin",
	async execute(message) {
		let pinValues;
		await axios.get(http_server_address + "pin-values").then(response => {
			pinValues = response.data;
		});

		const height = 14;
		const embed = new Discord.MessageEmbed()
			.setColor("#bc1142")
			.setTitle("GPIO Pin States")
			.addFields({
				name: "\u200B",
				value: formatPins(gpioPins.slice(0, height), pinValues),
				inline: true
			}, {
				name: "\u200B",
				value: formatPins(gpioPins.slice(height), pinValues),
				inline: true
			}, )
			.setTimestamp();

		message.channel.send(embed);
		return true;
	},
};

function formatPins(pins, pinValues) {
	return pins.map(p => `**${p}** - ${pinValues[p]}`);
}