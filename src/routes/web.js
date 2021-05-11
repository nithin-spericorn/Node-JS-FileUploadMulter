const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const {multiple, uploadFiles} = require("../controllers/upload");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", upload.single("file"), uploadFiles);
  router.post("/uploads",upload.array("file",4),uploadFiles) 

  return app.use("/", router);
};

module.exports = routes;
