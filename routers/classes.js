const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
class Database {
  constructor(url) {
    try {
      this.originalUrl = url;
      this.shortUrl_id = shortid.generate();
      this.creationDate = new Date().toLocaleString();
      this.redirectCount = 0;
      return this.store();
    } catch (error) {
      return error.message;
    }
  }
  store() {
    const data = fs.readFileSync(path.resolve(__dirname, "database.json"));
    const savedContent = JSON.parse(data);
    const id = this.shortUrl_id;
    savedContent[id] = {
      URL: this.originalUrl,
      counter: this.redirectCount,
      creationDate: this.creationDate,
    };
    fs.rmSync(path.resolve(__dirname, "./database.json"));
    fs.appendFile(
      "./routers/database.json",
      JSON.stringify(savedContent),
      (err) => {
        if (err) throw err;
        return this.shortUrl_id;
      }
    );
  }
  static prepareToRedirect(hash) {
    const data = fs.readFileSync(path.resolve(__dirname, "./database.json"));
    const savedContent = JSON.parse(data);
    const relevantContent = savedContent[hash];
    relevantContent.counter++;
    fs.rmSync(path.resolve(__dirname, "./database.json"));
    fs.appendFileSync("./routers/database.json", JSON.stringify(savedContent));
    return relevantContent.URL;
  }
  static getStats(hash) {
    const data = fs.readFileSync(path.resolve(__dirname, "./database.json"));
    const savedContent = JSON.parse(data);
    return savedContent[hash];
  }
}

module.exports = Database;
