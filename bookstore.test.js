const db = require("./db");
const Book = require("./models/book");
const app = require("./app")
const request = require("supertest")

describe("Test bookstore get routes", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    let book = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017
    });
  });

  test("get list of all books", async function() {
    let response = await request(app)
      .get(`/books/`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      books: [{
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017
      }]
    });
    expect(response.body.books.length).toBe(1);
    expect(response.body.books[0].isbn).toEqual("0691161518");
  })
});

describe("Test bookstore post routes", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    let book = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017
    });
  });

  test("add a book", async function () {
    let routeResponse = await request(app)
      .post(`/books/`)
      .send({
        "isbn": "069116151875",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthewwww LIZANE",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Harry needs to learn tests",
        "year": 2017
      });
    expect(routeResponse.statusCode).toBe(201);
    expect(routeResponse.body).toEqual({
      book: {
        isbn: "069116151875",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthewwww LIZANE",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Harry needs to learn tests",
        year: 2017
    }});

    let databaseResponse = await request(app).get('/books')
    expect(databaseResponse.body.books.length).toBe(2);
    expect(databaseResponse.body.books[0].isbn).toEqual("069116151875");
  })
});


afterAll(async function () {
  await db.end();
});