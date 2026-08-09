const form = document.getElementById("settings-form");
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const displayName = form.displayName.value.trim();
    const emailNotifications = form.emailNotifications.value;
    let errors = false;

    if (displayName.length < 3) {
      document.querySelector("[data-error-for=\"displayName\"]").textContent = "Display name is too short.";
      errors = true;
    } else {
      document.querySelector("[data-error-for=\"displayName\"]").textContent = "";
    }

    if (!["daily", "weekly", "never"].includes(emailNotifications)) {
      document.querySelector("[data-error-for=\"emailNotifications\"]").textContent = "Invalid email frequency.";
      errors = true;
    } else {
      document.querySelector("[data-error-for=\"emailNotifications\"]").textContent = "";
    }

    if (!errors) {
      message.textContent = "Settings saved.";
    }
  });
}

