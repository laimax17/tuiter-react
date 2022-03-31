import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikes from "./my-dislikes";

export const sample=   {
    tuit: "A Mock Tuit",
    postedBy: "Jack Ma",
    postedOn: "2021/12/12",
    stats: {
      replies: 10,
      retuits: 10,
      likes: 10,
      dislikes: 10,
    },
  };

test("renders dislike", async () => {
    render(<MyDislikes />);
    const linkElement = screen.getByText(/mockTuit/i);
    expect(linkElement).toBeInTheDocument();
  });