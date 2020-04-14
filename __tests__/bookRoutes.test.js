const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");


describe("book Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM books");
    
    await Book.create({
      "isbn": "0691161518",
      "amazon-url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
    });
    
  });
});

describe("GET /books", function () {
  test("Creates a new book", async function () {
    const response = await request(app).get(`/books`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "books": [
        {
          "isbn": "0691161518",
          "amazon_url": null,
          "author": "Matthew Lane",
          "language": "english",
          "pages": 264,
          "publisher": "Princeton University Press",
          "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
          "year": 2017
      }],
      "books": []}); 
  });
});

afterEach(async function() {
  // delete any data created by test
  await db.query("DELETE FROM books");
});

afterAll(async function() {
  // close db connection
  await db.end();
});