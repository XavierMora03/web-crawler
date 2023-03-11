const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
  urlString = urlString.toLowerCase();
  const urlObj = new URL(urlString);
  var path = urlObj.hostname + urlObj.pathname;
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path;
}
function getURLsFromHTML(htmlBody, baseURl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      var topush = baseURl + linkElement.href;
    } else {
      topush = linkElement.href;
    }

    if (topush.endsWith("/")) topush = topush.slice(0, -1);
    try {
      const laURL = new URL(topush);
    } catch (e) {
      console.log("error pana");
      topush = "";
    }
    console.log(topush);
    urls.push(topush);
  }
  return urls;
}
module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
