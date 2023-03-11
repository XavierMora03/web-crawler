const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL capitals and final /", () => {
  const input = "httpS://blog.boot.dev/pAth/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML", () => {
  const inputHTMLbody = `
  <html>
  <body>
      <a href="https://blog.boot.dev"
        Boot.dev blog
      </a>
  <body>
  <html>
  `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const expected = ["https://blog.boot.dev"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative path", () => {
  const inputHTMLbody = `
  <html>
  <body>
      <a href="/path/"
        Boot.dev blog
      </a>
  <body>
  <html>
  `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
  console.log(actual, "vs", expected);
});
test("getURLsFromHTML relative path multiple", () => {
  const inputHTMLbody = `
  <html>
  <body>
      <a href="/path/"
        Boot.dev blog
      </a>
      <a href="https://blog.boot.dev"
        Boot.dev blog
      </a>
  <body>
  <html>
  `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path", "https://blog.boot.dev"];
  expect(actual).toEqual(expected);
});
test("getURLsFromHTML invalid", () => {
  const inputHTMLbody = `
  <html>
  <body>
      <a href="path/"
        Boot.dev blog
      </a>
  <body>
  <html>
  `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
  const expected = [""];
  expect(actual).toEqual(expected);
});
