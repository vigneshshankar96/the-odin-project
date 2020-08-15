const signUpForm = document.querySelector("#sign-up-form")
const passwordField = document.querySelector(".password")
const confirmPasswordField = document.querySelector(".confirm-password")
const visibilityTogglers = document.querySelectorAll(".visibility-toggler");

signUpForm.addEventListener("submit", function (event) {
  // event.preventDefault();
  signUpForm.reset()
});
confirmPasswordField.addEventListener("change", function (event) {
    if (passwordField.value == confirmPasswordField.value) {
        confirmPasswordField.style.color = 'green';
    } else {
        confirmPasswordField.style.color = 'red';
    }
})

visibilityTogglers.forEach(toggler => {
  toggler.addEventListener("click", function (event) {
    if (event.target.previousElementSibling.type === "password") {
      event.target.previousElementSibling.type = "text";
    } else {
      event.target.previousElementSibling.type = "password";
    }
  })
});
