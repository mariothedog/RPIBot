const Discord = require("discord.js");
const client = new Discord.Client();

const {
	token,
	default_prefixes,
} = require("../config.json");

const fs = require("fs");

if (!fs.existsSync("Bot/user-config.json")) {
	fs.writeFileSync("Bot/user-config.json", "{}");
}

client.commands = new Discord.Collection();
const commandCategories = fs.readdirSync("./Bot/Commands");

for (const category of commandCategories) {
	const commandFiles = fs.readdirSync(`./Bot/Commands/${category}`);
	for (const file of commandFiles) {
		const command = require(`./Commands/${category}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.login(token);

client.once("ready", () => {
	client.user.setPresence({
		status: "online",
		game: {
			name: "m!help | Made by Mariothedog#4707",
		},
	});

	console.log("Ready!");
});

client.on("message", async message => {
	let hasPrefix = false;

	if (message.author.bot) {
		return;
	}

	let prefixUsed;
	for (const prefix of default_prefixes) {
		if (message.content.startsWith(prefix)) {
			hasPrefix = true;
			prefixUsed = prefix;
			break;
		}
	}

	if (!hasPrefix) {
		return;
	}

	const args = message.content.slice(prefixUsed.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		return message.reply("That command does not exist!");
	}

	if (command.nsfw && !message.channel.nsfw) {
		return message.reply("That command can only be used in an NSFW channel 😳");
	}

	const permissions = command.permissions;
	const member = message.member;
	if (permissions && !member.hasPermission("ADMINISTRATOR")) {
		for (const permission of permissions) {
			if (!member.hasPermission(permission)) {
				return message.reply(`You need the ${permissions.join(", ")} permission${permissions.length > 1 ? "s" : ""} to use the ${commandName} command!`);
			}
		}
	}

	try {
		if (!await command.execute(message, args, prefixUsed)) {
			return message.reply(`Invalid Usage! Correct usage: ${prefixUsed}${commandName} ${command.usage}`);
		}
	} catch (error) {
		console.log(`Error caught while executing the ${command.name} command`);
		console.error(error);
		return message.reply("There was an issue executing that command!");
	}
});