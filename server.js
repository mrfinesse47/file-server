const net = require("net");
const fs = require("fs");
const isValid = require("is-valid-path");
const { fileURLToPath } = require("url");

const server = net.createServer();

server.on("connection", (client) => {
  console.log("New client connected!");
  client.write(JSON.stringify({ fileSent: false, message: "Hello There" }));

  client.setEncoding("utf8"); // interpret data as text
  client.on("data", (data) => {
    console.log(data);
    const fname = "./serverFiles/" + data;
    console.log("Message from client: ", fname);
    if (isValid(fname)) {
      fs.access(fname, (err) => {
        if (err) {
          client.write("That file doesn't exist!");
        } else {
          fs.readFile(fname, "utf8", (err, fdata) => {
            if (!err) {
              console.log("sending the data");

              client.write(
                JSON.stringify({ fileSent: true, data: fdata, fname })
              );
            } else {
              client.write("is valid");
            }
          });
        }
      });
    } else {
      console.log("invalid file name");
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
