export function validateSettings(values) {
  const errors = {};

  if (!values.displayName || values.displayName.trim().length < 3) {
    errors.displayName = "Display name must be at least 3 characters.";
  }

  if (values.emailNotifications !== "daily" && values.emailNotifications !== "weekly" && values.emailNotifications !== "never") {
    errors.emailNotifications = "Please select a valid email notification preference.";
  }

  return errors;
}

export function getFormValues(form) {
  return {
    displayName: form.displayName.value.trim(),
    emailNotifications: form.emailNotifications.value,
  };
}

export function showErrors(form, errors) {
  form.querySelectorAll(".error").forEach((errorElem) => {
    const field = errorElem.dataset.errorFor;
    errorElem.textContent = errors[field] || "";
  });
}

export function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formMessage = document.getElementById("form-message");

  formMessage.textContent = "";
  const values = getFormValues(form);
  const errors = validateSettings(values);
  showErrors(form, errors);

  if (Object.keys(errors).length === 0) {
    formMessage.textContent = "Settings saved successfully!";
  }
}

export function initSettingsForm() {
  const form = document.getElementById("settings-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}

