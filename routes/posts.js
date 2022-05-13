const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.delete("/:id", PostsController.Delete);
router.post("/:id", PostsController.Update);

module.exports = router;
