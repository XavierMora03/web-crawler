const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provied");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  try {
    var resp = await crawlPage(baseURL);
  } catch (e) {
    console.log("no jalo el fetch", e);
  }

  console.log("el sitio tiene las siguientes paginas");
  for (link of resp) {
    console.log(link);
  }
}

main();
