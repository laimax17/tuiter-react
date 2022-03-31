import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikes from "./my-dislikes";

export const sample=   {
    tuit: "test tuit",
    postedBy: "1234abc",
    postedOn: "2022/12/31",
    stats: {
      replies: 1,
      retuits: 1,
      likes: 100,
      dislikes: 100,
    },
  };

test("renders dislike", async () => {
    render(<MyDislikes />);
    const linkElement = screen.getByText(/test tuit/i);
    expect(linkElement).toBeInTheDocument();
  });