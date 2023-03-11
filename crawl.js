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
    urls.push(topush);
  }
  return urls;
}

async function crawlPage(currUrl) {
  console.log(`actively crawling: ${currUrl}`);

  const resp = await fetch(currUrl);
  var texto = await resp.text();
  if (resp.status > 399) {
    console.log(
      "Error when trying to acces to ",
      currUrl,
      "status code: ",
      resp.status
    );
    return;
  }
  const sitesCrawled = getURLsFromHTML(texto, currUrl);
  return sitesCrawled;
}
module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
