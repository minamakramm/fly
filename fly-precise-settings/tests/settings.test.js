import { describe, expect, it } from "vitest";
import { validateSettings } from "../settings.js";

describe("validateSettings", () => {
  it("returns no errors for valid inputs", () => {
    const errors = validateSettings({ displayName: "Jane Doe", emailNotifications: "daily" });
    expect(errors).toEqual({});
  });

  it("returns an error when display name is too short", () => {
    const errors = validateSettings({ displayName: "Jo", emailNotifications: "daily" });
    expect(errors.displayName).toBe("Display name must be at least 3 characters.");
  });

  it("returns an error for an invalid email notification preference", () => {
    const errors = validateSettings({ displayName: "Jane Doe", emailNotifications: "hourly" });
    expect(errors.emailNotifications).toBe("Please select a valid email notification preference.");
  });
});

