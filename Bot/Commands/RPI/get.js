const axios = require("axios");
const {
	http_server_address,
} = require("../../../config.json");

module.exports = {
	name: "get",
	usage: "<GPIO pin number>",
	description: "Gets the state of the GPIO pin specified",
	async execute(message, args) {
		// TODO: Finish
		await axios.get(http_server_address).then(res => {
			console.log(res);
		}).catch((error) => {
			console.error(error);
		});
		return true;
	},
};
