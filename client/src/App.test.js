import { render, screen } from "@testing-library/react";
import App from "./App";

<<<<<<< HEAD
test("renders FoxDen heading", () => {
  render(<App />);
  const heading = screen.getByText(/dark market intelligence/i);
=======
test("renders recommendations heading", () => {
  render(<App />);
  const heading = screen.getByText(/top 3 stock recommendations/i);
>>>>>>> Kaylee_experiment
  expect(heading).toBeInTheDocument();
});
