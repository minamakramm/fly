# AI Prompts Used for React Settings App

## 1. Initial feature prompt
Build a small React settings form with validation for a capstone dashboard. The form should include:
- Display name (text input)
- Email notifications (select with daily, weekly, never)
- Validation errors shown inline
- A save button with a success message

## 2. Refinement prompt
Refactor the settings form so validation is extracted into a reusable function `validateSettings(values)`. Keep form state in React state and ensure the validation function returns a field-to-error map. Add aria roles for the error messages.

## 3. Testing prompt
Write React Testing Library tests for the settings form covering:
- invalid display name
- successful save message

## 4. Review prompt
Review the React form code and suggest manual improvements for accessibility and separation of concerns.
