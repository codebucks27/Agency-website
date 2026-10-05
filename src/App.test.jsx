import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import App from "./App";

test("renders the agency's lazy page sections and original content", async () => {
  const { container } = render(<App />);

  expect(await screen.findByRole("heading", {
    name: "Transforming your digital presence",
  }, { timeout: 3000 })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "About Us" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "What We Do" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Get in touch" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Few good words about us!" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "@CodeBucks" })).toHaveAttribute(
    "href", "https://www.youtube.com/channel/UCeYt6blRBKuNrEg_-282fSA",
  );
  expect(container.querySelectorAll("#services img")).toHaveLength(6);
  for (const image of container.querySelectorAll("#services img")) {
    expect(image).toHaveAttribute("src", expect.stringMatching(/\.(svg|png)$/));
  }
  expect(container.querySelector(".slick-slider")).toBeInTheDocument();
  expect(container.querySelectorAll(".slick-dots li")).toHaveLength(4);
});

test("keeps section navigation and the real testimonial carousel working", async () => {
  const user = userEvent.setup();
  const scrollIntoView = vi.spyOn(Element.prototype, "scrollIntoView");
  const { container } = render(<App />);
  await screen.findByRole("heading", { name: "Transforming your digital presence" }, { timeout: 3000 });

  const desktopNav = screen.getAllByRole("navigation")[0];
  await user.click(within(desktopNav).getByRole("link", { name: "Services" }));
  expect(scrollIntoView).toHaveBeenCalledWith({
    behavior: "smooth", block: "end", inline: "nearest",
  });
  expect(scrollIntoView.mock.instances.at(-1)).toBe(document.getElementById("services"));

  const slider = container.querySelector(".slick-slider");
  if (!(slider instanceof HTMLElement)) throw new Error("The testimonial slider did not mount.");
  expect(slider.querySelector(".slick-current")).toHaveAttribute("data-index", "0");
  await user.click(within(slider).getByRole("button", { name: "Next" }));
  await waitFor(() => expect(slider.querySelector(".slick-current")).toHaveAttribute("data-index", "1"));
});
