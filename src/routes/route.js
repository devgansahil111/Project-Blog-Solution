const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const blogModels = require("../models/blogModels");
const middleware = require("../middleware/auth");









router.post("/createAuthor", authorController.createAuthor);

router.post("/createBlog/:authorId", middleware.auth, middleware.authorize, blogController.createBlog);

router.get("/blogs/:authorId", middleware.auth, middleware.authorize, blogController.getBlogs);

router.put("/blogs/:blogId/:authorId", middleware.auth, middleware.authorize, blogController.updateBlog);

router.delete("/blogs/:blogId/:authorId", middleware.auth, middleware.authorize, blogController.deleteBlog);

router.delete("/delete/blogs/:authorId", middleware.auth, middleware.authorize, blogController.deleteByQueryParam);

router.post("/login", authorController.loginAuthor);



module.exports = router;