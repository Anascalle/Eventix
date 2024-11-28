import React from "react";
import "./AcceptButton.css";
import { AcceptButtonProps } from "../../../Types/types";

const AcceptButton: React.FC<AcceptButtonProps> = ({ onClick }) => {
  return (
    <div>
      <button id="accept_button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <path d="M1.62666 6.6384L4.80537 10.4431L11.1022 1.77096" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
      </button>
    </div>
  );
};

export default AcceptButton;
