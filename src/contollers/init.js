const axios = require("axios");
const { Server } = require("socket.io");
const cron = require("node-cron");

module.exports = function (app) {

	const ioServer = new Server(app);
	//to get data when the server starts
	fetchPing(ioServer);
	getListOfCryptocurrencies(ioServer);
	getCryptocurrenciesRate(ioServer);

	cron.schedule("*/3 * * * *", async () => {
		try {
			fetchPing(ioServer);
			getListOfCryptocurrencies(ioServer);
			getCryptocurrenciesRate(ioServer);
		} catch (error) {}
	});
}

/**
 * CONFIGURATION SETTINGS
 */
const FETCH_INTERVAL = 180000;
const PRETTY_PRINT_JSON = true;

//https://api.coingecko.com/api/v3/ping
const fetchPing = async (ioServer) => {
	try {
		const getData = await axios.get("https://api.coingecko.com/api/v3/ping");
		console.log(getData.data);
		if (!getData) throw new Error("External Api does not exists");

		ioServer.emit("ping-response", JSON.stringify(getData.data));
	} catch (error) {
		ioServer.emit("ping-error", JSON.stringify(error));
	}
};

//https://api.coingecko.com/api/v3/coins/list
const getListOfCryptocurrencies = async (ioServer) => {
	try {
		const getData = await axios.get(
			"https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
		);
		console.log(getData.data);
		if (!getData) throw new Error("External Api does not exists");
		ioServer.emit("currencies-response", JSON.stringify(getData.data));
	} catch (error) {
		ioServer.emit("currencies-error", JSON.stringify(error));
	}
};

const getCryptocurrenciesRate = async (ioServer) => {
	try {
		const getData = await axios.get(
			"https://api.coingecko.com/api/v3/exchange_rates"
		);
		console.log(getData.data);
		if (!getData) throw new Error("External Api does not exists");
		ioServer.emit("rate-response", JSON.stringify(getData.data));
	} catch (error) {
		ioServer.emit("rate-error", JSON.stringify(error));
	}
};
