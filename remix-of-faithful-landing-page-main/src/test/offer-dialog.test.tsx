import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Index } from "@/routes/index";

describe("Reco Social offer", () => {
  it("opens the instructions and links to the official Reco Social App Store listing", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: /claim my \$100/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Start using Reco Social" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start now/i })).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/reco-social/id6742024490",
    );
  });

  it("closes the instructions with the close button", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: /claim my \$100/i }));
    fireEvent.click(screen.getByRole("button", { name: "Close Reco Social instructions" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
