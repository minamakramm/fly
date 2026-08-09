import { useState } from 'react';

const emailOptions = [
  { value: 'daily', label: 'Daily summary' },
  { value: 'weekly', label: 'Weekly digest' },
  { value: 'never', label: 'Never' }
];

interface FormValues {
  displayName: string;
  emailNotifications: string;
}

interface FormErrors {
  displayName?: string;
  emailNotifications?: string;
}

const validateSettings = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.displayName.trim() || values.displayName.trim().length < 3) {
    errors.displayName = 'Display name must be at least 3 characters.';
  }

  if (!emailOptions.some((option) => option.value === values.emailNotifications)) {
    errors.emailNotifications = 'Select a valid email preference.';
  }

  return errors;
};

function App() {
  const [values, setValues] = useState<FormValues>({
    displayName: '',
    emailNotifications: 'daily'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateSettings(values);
    setErrors(validation);
    setMessage('');

    if (Object.keys(validation).length === 0) {
      setMessage('Settings saved successfully!');
    }
  };

  return (
    <main>
      <h1>Capstone Settings</h1>
      <form onSubmit={handleSubmit} noValidate>
        <p>Update your profile settings for the capstone dashboard.</p>

        <div className="field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange}
          />
          <p className="error" role="alert">{errors.displayName}</p>
        </div>

        <div className="field">
          <label htmlFor="emailNotifications">Email notifications</label>
          <select
            id="emailNotifications"
            name="emailNotifications"
            value={values.emailNotifications}
            onChange={handleChange}
          >
            {emailOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="error" role="alert">{errors.emailNotifications}</p>
        </div>

        <button type="submit">Save settings</button>
        {message && <p id="form-message" role="status">{message}</p>}
      </form>
    </main>
  );
}

export default App;
