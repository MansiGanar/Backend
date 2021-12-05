import express, { json } from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const blogsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const blogsJSONPath = join(currentFolderPath, "blogs.json");

blogsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(blogsJSONPath);
  //   console.log(fileContent); We get buffer by this ...machine readable
  //   console.log("File Content: ", JSON.parse(fileContent));

  const blogsArray = JSON.parse(fileContent);

  //   console.log("This is the GET method");
  res.send(blogsArray);
});

export default blogsRouter;
