import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Emoji testleri", () => {
  let baslik;
  let liste;
  let input;
  let search;
  let button;
  let alert;
  beforeEach(() => {
    render(<App />);
    baslik = screen.getByText("🐱 Emoji Search 🐱");
    liste = screen.getAllByTestId("emoji");
    button = screen.getAllByTestId("button");
    input = screen.getByTestId("input");

    search = "gr";
  });
  test("başlık bulunmalı", () => {
    expect(baslik).toBeInTheDocument();
  });
  test("input  bulunmalı", () => {
    expect(input).toBeInTheDocument();
  });
  test("liste render edilmeli", () => {
    expect(liste.length).toEqual(9);
  });
  test("filtreleme işlemi başarılı olmalı", () => {
    userEvent.type(input, search);
    liste = screen.getAllByTestId("emoji");
    expect(liste.length).toEqual(3);
  });
  test("Tıklanınca emoji panoya kopyalanmalı", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    const firstEmojiButton = screen.getByText("💯").closest("button");

    await userEvent.click(firstEmojiButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("💯");
  });
});
