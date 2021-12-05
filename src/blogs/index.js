import express, { json } from "express";
import fs from "fs";
import uniqid from "uniqid";
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

blogsRouter.post("/", (req, res) => {
  console.log("Body: ", req.body);

  const newBlogs = { ...req.body, crearedAt: new Date(), id: uniqid() };
  console.log(newBlogs);

  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));

  blogs.push(newBlogs);

  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs));

  //   console.log("POST method");
  res.status(201).send({ id: newBlogs.id });
});

blogsRouter.delete("/:blogsId", (req, res) => {
  const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));

  const remainingBlogs = blogs.filter((blog) => blog.id !== req.params.blogId);

  fs.writeFileSync(blogsJSONPath, JSON.stringify(remainingBlogs));

  res.status(204).send();
});

export default blogsRouter;
