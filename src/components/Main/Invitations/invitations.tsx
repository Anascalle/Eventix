import React from "react";
import "./invitations.css";
import porfiles from "../data/data";
import InvitationsCards from "./cards";

const Invitations: React.FC = (
) => {
  return (
    <div id="invitations_shadow">
      <div id="invitations_div">
        <h2>Invitations</h2>
        {porfiles.map((profile, index) => (
        <InvitationsCards
          key={index}
          name={profile.name}
          ocation={profile.Ocation}
          date={profile.Date}
          url={profile.img}
        />
      ))}
      </div>
    </div>
  );
};

export default Invitations;