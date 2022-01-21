/* eslint-disable linebreak-style */
const express = require("express");
const http = require("http");
const cors = require("cors");
const getData = require("./src/contollers/init");


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

getData(server);

server.listen(3001, () => {
	console.log("listening on *:3001");
});

