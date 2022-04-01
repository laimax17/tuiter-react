import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikes from "../components/profile/my-dislikes";


test("renders dislike", async () => {
    render(<MyDislikes />);
    const linkElement = screen.getByText(/test/i);
    expect(linkElement).toBeInTheDocument();
  });