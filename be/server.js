const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const logger = require("./middleware/logger");
const errHandler = require("./middleware/error");

const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const satellites = require("./routes/satellites");

const app = express();

app.use(logger);
// if (process.env.NODE_ENV == "development") {
//   app.use(morgan("dev"));
// }

//cross plat
app.use(cors());
app.options("*", cors());

app.use("/api/v1/satellites", satellites);

app.use(errHandler);

app.use("/", express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.yellow.italic);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR:${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
