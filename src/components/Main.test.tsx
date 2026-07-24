import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainSection from "./Main";

describe("MainSection contact form", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<MainSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your message."),
    ).toBeInTheDocument();
  });

  it("flags an invalid email while other fields are valid", async () => {
    const user = userEvent.setup();
    render(<MainSection />);

    await user.type(screen.getByLabelText(/name/i), "Emil");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(
      screen.getByLabelText(/message/i),
      "This message is long enough.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Please enter your name."),
    ).not.toBeInTheDocument();
  });

  it("submits successfully and clears the form with valid input", async () => {
    const user = userEvent.setup();
    render(<MainSection />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, "Emil");
    await user.type(screen.getByLabelText(/email/i), "emil@example.com");
    await user.type(
      screen.getByLabelText(/message/i),
      "This message is long enough.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      screen.getByText("Your message has been sent successfully."),
    ).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
  });
});
