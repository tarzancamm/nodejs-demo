const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="mymessage"/><button type="submit">Send</button></form></body>'
        );
        res.write("</html>");
        return res.end();
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        // Event listener
        req.on("data", (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        // Event listener that creates new buffer and adds all chunks of data into it
        return req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split("=")[1];
          // Create new file
          fs.writeFile("message.txt", message, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
        });
      }
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Hello</title></head>");
      res.write("<body><p>Hello Worlds</p></body>");
      res.write("</html>");
      res.end();
}

// module.exports = requestHandler

// module.exports.handler = requestHandler
// module.exports.randomText = "This is some random hard coded text"

// exports.handler = requestHandler
// exports.randomText = "This is some random hard coded text"

module.exports = {
    handler: requestHandler,
    randomText: "This is some random hard coded text"
}
