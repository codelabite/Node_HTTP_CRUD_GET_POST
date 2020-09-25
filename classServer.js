// declaring the http variable
const http = require("http");

//declaring your port variable
const PORT = 7000;

// creating a dataset
const codelab = [
  { id: 1, name: "Peter" },
  { id: 2, name: "Ola" },
  { id: 3, name: "Bukky" },
  { id: 4, name: "Osas" },
];

// creating the server entering point
const classServer = http.createServer((req, res) => {
  console.log("Ready to run the Class SERVER!");
  // res.writeHead(PORT, {
  //   "Content-Type": "application/json",
  // });

  // setting the text type
  res.setHeader("Content-Type", "application/json");
  //printing the header authorization token to the console
  console.log(req.headers.authorization);

  // creating an empty list
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      const { method, url } = req;
      let status = 404;
      response = {
        success: false,
        data: null,
      };

      // create a condition that checks if the method and url equal to the values provided
      if (method === "GET" && url === "/codelab/API") {
        status = 200;
        response.success = true;
        response.data = codelab;

        // otherwise it performs a POST operation
      } else if (method === "POST" && url === "/codelab/API") {
        const { id, name } = JSON.parse(body);
        if (!id || !name) {
          status = 404;
          response.success = false;
          response.data = null;
          error = "Please fill in the correct value";
        } else {
          codelab.push({ id, name });
          status = 201;
          response.success = true;
          response.data = codelab;
        }
      }

      // provide the header status of the operation
      res.writeHead(status, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(response));
    });
});

// Display to the console if the server is running.
classServer.listen(PORT, () => {
  console.log(`Server up and Running in PORT: ${PORT}`);
});
