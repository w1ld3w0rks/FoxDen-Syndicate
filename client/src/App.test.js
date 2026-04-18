import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders FoxDen heading", () => {
  render(<App />);
  const heading = screen.getByText(/dark market intelligence/i);
  expect(heading).toBeInTheDocument();
});
