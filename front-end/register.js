const emailRegister = document.getElementById("email-register");
const passwordRegister = document.getElementById("psw-register");
const signUpButton = document.getElementById("registerButton");
const server = "http://localhost:3000/";
const notyf = new Notyf({ duration: 3000, dismissible: true });

signUpButton.addEventListener("click", async () => {
  try {
    if (!emailRegister.value && !passwordRegister.value) {
      notyf.error("please enter email and password");
      return;
    }
    const { data } = await axios.post(
      `${server}signup`,
      JSON.stringify({
        email: emailRegister.value,
        password: passwordRegister.value,
      })
    );
    window.location = data;
  } catch (error) {
    notyf.error(error.response.data);
  }
});
