const app = require("../app");
const http = require("http");
const PORT = require("../config/properties").PORT;
const server = http.createServer(app);
const { jobStart, jobStop } = require("../helpers/cron");

server.listen(PORT, () => {
  jobStart();
  console.log("Server userService is running on: ", PORT);
});

process.on("SIGINT", () => {
  jobStop();
  server.close();
  console.log("SIGINT signal received. - SERVER CLOSING");
  process.exit(0);
});
