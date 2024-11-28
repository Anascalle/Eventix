import React from "react";
import GuestEventes from "./guest";
import useGuestEvents from "../../../hooks/useGuest";
import "./guest.css";

const Guest: React.FC<{ userId: string }> = React.memo(({ userId }) => {
  const { profiles, invitations, loading, error } = useGuestEvents(userId); 
  const coolors = ['#D9C0F9', '#FFD4D4', '#FFE4AF', '#CFFAD0'];
  const shouldEnableScroll = profiles.length > 4;

  return (
    <div aria-label="carousel guest events" id="guest_card">
      <h2 aria-label="carousel guest events title" id="guest_tittle">You are Guest</h2>
      <div 
        id="carousel_g" 
        className="carousel-container"
        style={{
          overflowX: shouldEnableScroll ? 'auto' : 'hidden',
        }}
      >
        {loading ? (
          <p id="loading" aria-live="polite">Loading events...</p>
        ) : error ? (
          <p id="error" aria-live="assertive">{error}</p>
        ) : (
          profiles.length > 0 ? (
            <div id="guest_events_container">
              {profiles.map((profile, index) => {
                const coloor = coolors[index % coolors.length];
                return (
                  <div 
                    key={profile.id} 
                    aria-label={`Event ${profile.name} on ${profile.date}`} 
                    className="carousel_item_g"
                  >
                    <GuestEventes
                      id={profile.id}
                      ocation={profile.eventType}
                      invitations={invitations.filter(inv => inv.eventId === profile.id)}
                      name={profile.name}
                      date={profile.date}
                      coloor={coloor}
                      aria-hidden="false"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="guest_event_card">
              <p id="no_events" aria-live="polite">No events available</p>
            </div>
          )
        )}
      </div>
    </div>
  );
});

export default Guest;
