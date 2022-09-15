const express = require("express");
const bookController = require("../controller/book");

const router = express.Router();

// routes for all books
router.route("/").get(bookController.getBooks).post(bookController.addBook);

// routes for individual book
router
  .route("/:id")
  .get(bookController.getBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
