const http = require("http");
const Client = require("socket.io-client");
const assert = require("chai").assert;
const coingeckoRestCall = require("../contollers/init.js");

// with { "type": "commonjs" } in your package.json
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");
// const assert = require("chai").assert;

describe("io socket (websocket) test", () => {
  let io, serverSocket, clientSocket;

  before((done) => {
    const httpServer = http.createServer();
    coingeckoRestCall(httpServer);
    httpServer.listen(3002, () => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
    //   io.on("connection", (socket) => {
    //     serverSocket = socket;
    //   });
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    // io.close();
    clientSocket.close();
  });

  it("should work emit message from ping", (done) => {
    clientSocket.on("ping-response", (arg) => {
      console.log(arg)
      assert.isNotEmpty(arg);
      done();
    });
  });

  it("should work emit message from currencies", (done) => {
    clientSocket.on("currencies-responsee", (arg) => {
      console.log(arg)
      assert.isNotEmpty(arg);
      done();
    });
  });

  it("should work emit message from rate", (done) => {
    clientSocket.on("rate-response", (arg) => {
      console.log(arg)
      assert.isNotEmpty(arg);
      done();
    });
  });

//   it("should work (with ack)", (done) => {
//     serverSocket.on("hi", (cb) => {
//       cb("hola");
//     });
//     clientSocket.emit("hi", (arg) => {
//       assert.equal(arg, "hola");
//       done();
//     });
//   });
});