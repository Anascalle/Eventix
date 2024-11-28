import React from "react";
import "./RejectButton.css";
import { RejectButtonProps } from "../../../Types/types";

const RejectButton: React.FC<RejectButtonProps> = ({ onClick }) => {
  return (
    <div>
      
      <button id="reject_button" onClick={onClick}>
        <span className="material-symbols-outlined">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M1.34961 1.34961L9.18961 9.18961" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M9.18945 1.34961L1.34945 9.18961" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg></span>
      </button>
    </div>
  );
};

export default RejectButton;
