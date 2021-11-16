const urlInput = document.getElementById("url_input");
const submitButton = document.getElementById("submit original");
const resultArea = document.getElementById("new URL");
const statsInput = document.getElementById("stats input");
const showStatsButton = document.getElementById("submit to show stats");
const infoDiv = document.getElementById("info area");
const server = "http://localhost:3000/";
const notyf = new Notyf({ duration: 3000, dismissible: true });

const shortener = async () => {
  try {
    const urlToChange = urlInput.value;
    if (!urlToChange) return;
    const { data } = await axios.post(
      `${server}shorten`,
      JSON.stringify(urlToChange)
    );
    if (!data.hasOwnProperty("_id")) {
      window.location = "/403";
      return;
    }
    const { shortUrl_id } = data;
    urlInput.value = "";
    const newRL = `http://localhost:3000/original/${shortUrl_id}`;
    resultArea.innerHTML = `<a target="_blank" href=${newRL}>${newRL}</a>`;
  } catch (error) {
    notyf.error("oops, something went wrong...");
  }
};

submitButton.addEventListener("click", shortener);

const presentStats = async () => {
  try {
    const shortenedUrl = statsInput.value;
    if (!shortenedUrl) return;
    const dividedUrl = shortenedUrl.split("/");
    const uniqueHash = dividedUrl[dividedUrl.length - 1];
    const { data } = await axios.get(`${server}statistic/${uniqueHash}`);
    if (!data.hasOwnProperty("_id")) {
      window.location = "/403";
      return;
    }
    infoDiv.innerText = `your shortened URL was created at ${
      data.creationDate
    } \n from ${data.URL}, \n and it was entered ${data.counter} ${
      data.counter === 1 ? "time" : "times"
    }.`;
    infoDiv.classList.add("alert", "alert-success");
    setTimeout(() => {
      infoDiv.classList.remove("alert", "alert-success");
      infoDiv.innerText = "";
    }, 10000);
  } catch (error) {
    notyf.error(`sorry, ${error.response.data}`);
  }
};
showStatsButton.addEventListener("click", presentStats);
