import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders recommendations heading", () => {
  render(<App />);
  const heading = screen.getByText(/top 3 stock recommendations/i);
  expect(heading).toBeInTheDocument();
});
