# AI Workflow Comparison: lazy-settings vs precise-settings

For this drill I built the same capstone-relevant feature twice: a settings form with validation and user feedback.

## Branch strategy

- `lazy-settings`: created from the master base with a one-sentence prompt and minimal review.
- `precise-settings`: started from the same clean base, then used a detailed prompt with file references, constraints, expected behavior, and a verification step.

## What changed between rounds

The lazy branch implemented the feature directly inside the submit handler with DOM queries and inline error handling. It looked like a quick win, but it was hard to test and easy to review incorrectly. The precise branch instead extracted validation logic into `validateSettings`, separated DOM access into `getFormValues` and `showErrors`, and kept `handleSubmit` focused on orchestration.

The specific code diff shows:

- `lazy-settings` uses `document.querySelector` inside the submit callback for each field.
- `precise-settings` uses a pure `validateSettings(values)` function with a reusable error object.
- `precise-settings` adds explicit invalid-value handling for `emailNotifications` and a clear success message.
- `precise-settings` creates a dedicated test file for validation logic, which `lazy-settings` does not.

## Verification and review

Round one was fast to generate, but the review effort was higher because the code mixed UI and logic and had no automated checks. I caught at least one AI mistake after reviewing it: the lazy version did not separate DOM-driven effects from validation logic, which would make the next feature or unit test harder to add.

Round two felt slower up front, but it was faster end to end because I wrote tests immediately and the implementation was easier to verify. The precise branch took three commits: implementing logic, adding tests, and fixing the module so it did not assume a browser DOM during test execution.

## Accessibility and edge cases

The precise branch also improved accessibility by ensuring validation errors are rendered by `.error` elements next to each field rather than using a generic alert. It caught an edge case in `emailNotifications` input handling by validating the exact allowed values `daily`, `weekly`, and `never`.

## What I learned

- A vague prompt can generate code quickly, but it often leaves hidden design issues.
- Explicit constraints and example behavior in the prompt produce code that is more modular and testable.
- Verification by writing tests immediately is the most reliable way to make the AI output production-safe.

This drill proved that the second round is usually more efficient, because the extra time spent prompting precisely pays off in reduced review and debugging effort.