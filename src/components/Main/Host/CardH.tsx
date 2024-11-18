import React from "react";
import "./Host.css";
import HostEvents from "./Host";
import useHostEvents from "../../../hooks/useHostEvents";

const Host: React.FC<{ userId: string }> = ({ userId }) => {
  const { profiles, invitations, loading, error } = useHostEvents(userId);
  const colors = ['#FFD4D4', '#A8EEDE', '#FFE4AF', '#FFD4D4'];

 
  const shouldEnableScroll = profiles.length > 3;

  return (
    <div aria-label="carousel host events" id="host_card">
      <h2 aria-label="carousel host events title" id="host_tittle">You are Host</h2>
      <div aria-label="carousel host events" id="carousel_div">
        {loading ? (
          <p id="loading" aria-live="polite">Loading events...</p>
        ) : error ? (
          <p id="error" aria-live="assertive">{error}</p>
        ) : (
          <div 
            id="carousel" 
            className="carousel-container"
            style={{
             
              overflowX: shouldEnableScroll ? 'auto' : 'hidden',
            }}
          >
            {profiles.map((profile, index) => {
              const color = colors[index % colors.length];
              return (
                <div key={profile.id} className="carousel-item">
                  <HostEvents
                    id={profile.id}
                    image={profile.image}
                    invitations={invitations.filter(inv => inv.eventId === profile.id)}
                    name={profile.name}
                    date={profile.date}
                    color={color}
                    aria-hidden="false"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Host;
