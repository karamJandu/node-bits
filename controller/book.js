const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

const addBook = asyncHandler(async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json({ message: "Title and Author both are required" });
    return;
  }
  const book = await Book.create({ title, author });
  res.status(200).json(book);
});

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  if (books == null) {
    res.status(500).json({ message: "Could not get books" });
    return;
  }
  res.status(200).json(books);
});

const getBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = await Book.findOne({ id });
  res.status(200).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body);
  book.save();
  res.status(200).json(book);
});

const deleteBook = asyncHandler(async (req, res) => {
  await Book.deleteOne({ id: req.params.id });
  res.status(200).json({ message: "Delete Successful" });
});

module.exports = { addBook, getBooks, getBook, updateBook, deleteBook };
