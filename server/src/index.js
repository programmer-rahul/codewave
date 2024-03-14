import dotenv from "dotenv";
import httpServer from "./app.js";

dotenv.config({
  path: "./.env",
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port " + process.env.PORT);
});
