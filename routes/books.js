const express = require("express");
const router = express.Router();

// routes for all books
router
  .route("/")
  .get((req, res) => {
    res.json({ Response: "Get All Books" });
  })
  .post((req, res) => {
    res.json({ Response: "Book is stored" });
  });

// routes for individual book
router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    res.send(`Get book with id ${id}`);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`Get book with id ${id}`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`Get book with id ${id}`);
  });

module.exports = router;
