const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

process.env.NODE_ENV = 'test';

describe("book Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM books");
    
    let testBook = await Book.create({
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
    });
  });

  test("Get all books", async function () {
    const response = await request(app).get(`/books`);
    expect(response.body.books).toHaveLength(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "books": [
        {
          "isbn": "0691161518",
          "amazon_url": "http://a.co/eobPtX2",
          "author": "Matthew Lane",
          "language": "english",
          "pages": 264,
          "publisher": "Princeton University Press",
          "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
          "year": 2017
      }]
    }); 
  });

  test("Create a book", async function () {
    const response = await request(app)
      .post(`/books`)
      .send({
        isbn: "0692161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Tim Garica",
        language: "english",
        pages: 264,
        publisher: "Rithm University Press",
        title: "Power-Down: Unlocking Your Hatred of Mathematics in Video Games",
        year: 2017
      });
    let getBookTest = await request(app).get('/books/0692161518');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(getBookTest.body);
    expect(response.body).toEqual({
      "book":
        {
          "isbn": "0692161518",
          "amazon_url": "http://a.co/eobPtX2",
          "author": "Tim Garica",
          "language": "english",
          "pages": 264,
          "publisher": "Rithm University Press",
          "title": "Power-Down: Unlocking Your Hatred of Mathematics in Video Games",
          "year": 2017
      }
    });

  });
  
  afterEach(async function() {
    // delete any data created by test
    await db.query("DELETE FROM books");
  });
  
});

afterAll(async function() {
  // close db connection
  await db.end();
});