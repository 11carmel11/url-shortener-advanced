const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("psw-login");
const loginButton = document.getElementById("loginButton");
const server = "http://localhost:3000/";
const notyf = new Notyf({ duration: 3000, dismissible: true });

loginButton.addEventListener("click", async () => {
  try {
    if (!emailLogin.value && !passwordLogin.value) {
      notyf.error("please enter email and password");
      return;
    }
    const { data } = await axios.get(
      `${server}signin?email=${emailLogin.value}&&password=${passwordLogin.value}`
    );
    window.location = "/page";
  } catch (error) {
    const { data } = error.response;
    notyf.error(data);
  }
});
