module.exports = {
	name: "ping",
	description: "Returns message sending latency",
	execute(message) {
		message.channel.send("Pinging...").then(msg => {
			msg.edit(`Pong with a latency of ${msg.createdTimestamp - message.createdTimestamp}ms!`);
		});
		return true;
	},
};