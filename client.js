const net = require("net");
const fs = require("fs");
const GETFILE = "rex.jpeg";

const conn = net.createConnection({
  host: "localhost", // change to IP address of computer or ngrok host if tunneling
  port: 3000, // or change to the ngrok port if tunneling
});

conn.setEncoding("utf8"); // interpret data as text

conn.on("data", (data) => {
  const obj = JSON.parse(data);
  if (obj.fileSent === false) {
    console.log("server says:", obj.message);
  } else {
    const path = obj.fname.replace("/serverFiles", "/clientFiles");
    //console.log(path);
    console.log(obj.data);
    writeFile(obj.data, path);
  }
});

conn.on("connect", () => {
  conn.write(GETFILE);
});

const writeFile = (data, path) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("wrote file successfully");
    }
  });
};

// conn.write(`GET / HTTP/1.1\r\n`);
// conn.write(`Host: example.edu\r\n`);
// conn.write(`\r\n`);
