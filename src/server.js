import express from "express";
import listEndpoints from "express-list-endpoints";
import blogsRouter from "./blogs/index.js";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";
import cors from "cors";

const server = express();

const port = 3001;
server.use(express.json());

server.use("/blogs", blogsRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port", port);
});
