import { styled } from "@stitches/react";

const Button = styled("button", {
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  gap: "4px",
  alignItems: "center",

  "&:disabled": {
    opacity: "0.5",
    cursor: "not-allowed",
  },

  "&:hover": {
    backgroundColor: "lightgray",
  },
});
