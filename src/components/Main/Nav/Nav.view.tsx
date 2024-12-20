import { useUser } from "../../../context/useContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Nav.css";
import InvitationsAccept from "../AceptedInvitations/AceptedInvitations";

const Nav2: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate(); 
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [hasNotification, setHasNotification] = useState<boolean>(false);

  const userName = user?.username || "Guest";
  const userImg = user?.img || "https://via.placeholder.com/50";

  useEffect(() => {
    if (userId) {
      const notificationsRef = doc(db, "users", userId, "notifications", "accepted");
      const unsubscribeNotifications = onSnapshot(notificationsRef, (docSnap) => {
        if (docSnap.exists()) {
          const notifications = docSnap.data();
          if (notifications && notifications.hasAccepted) {
            setNotificationCount((prevCount) => prevCount + 1);
            setHasNotification(true);
          }
        }
      });

      return () => unsubscribeNotifications();
    }
  }, [userId]);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
    setHasNotification(false);
  };

  const handleEventixClick = () => {
    if (user?.uid) {
      navigate(`/main/${user.uid}`);
      navigate("/login");
    }
  };
   
  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`); 
    } else {
      console.error("User ID is not available.");
    }
  };

  return (
    <nav className="nav_bar2">
      <h1 className="app_name" onClick={handleEventixClick}>
        Eventix
      </h1>
      <h1 className="app_name_responsive" onClick={handleEventixClick}>
        Eventix
      </h1>
      <div className="user-container">
        <button
          id="svg_button"
          onClick={toggleModal}
          className={hasNotification ? "notification-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M21.0002 28C21.0002 28.2652 20.8949 28.5196 20.7073 28.7071C20.5198 28.8946 20.2654 29 20.0002 29H12.0002C11.735 29 11.4807 28.8946 11.2931 28.7071C11.1056 28.5196 11.0002 28.2652 11.0002 28C11.0002 27.7348 11.1056 27.4804 11.2931 27.2929C11.4807 27.1054 11.735 27 12.0002 27H20.0002C20.2654 27 20.5198 27.1054 20.7073 27.2929C20.8949 27.4804 21.0002 27.7348 21.0002 28ZM27.7315 24C27.558 24.3056 27.3061 24.5595 27.0017 24.7353C26.6974 24.911 26.3517 25.0024 26.0002 25H6.00023C5.64865 24.9995 5.30341 24.9064 4.9993 24.73C4.69519 24.5535 4.44297 24.3 4.26804 23.9951C4.09312 23.6901 4.00168 23.3444 4.00294 22.9928C4.0042 22.6412 4.09812 22.2962 4.27523 21.9925C4.96898 20.7975 6.00023 17.4175 6.00023 13C6.00023 10.3478 7.0538 7.8043 8.92916 5.92893C10.8045 4.05357 13.3481 3 16.0002 3C18.6524 3 21.1959 4.05357 23.0713 5.92893C24.9467 7.8043 26.0002 10.3478 26.0002 13C26.0002 17.4163 27.0327 20.7975 27.7265 21.9925C27.9054 22.2966 28 22.6429 28.0006 22.9957C28.0013 23.3486 27.908 23.6952 27.7302 24H27.7315ZM26.0002 23C25.034 21.3412 24.0002 17.5063 24.0002 13C24.0002 10.8783 23.1574 8.84344 21.6571 7.34315C20.1568 5.84285 18.122 5 16.0002 5C13.8785 5 11.8437 5.84285 10.3434 7.34315C8.84309 8.84344 8.00023 10.8783 8.00023 13C8.00023 17.5075 6.96523 21.3425 6.00023 23H26.0002Z"
              fill="#343330"
            />
          </svg>
          {hasNotification && (
            <span className="notification-badge">+{notificationCount}</span>
          )}
        </button>
        <img
          id="profile_img_nav"
          src={userImg}
          alt="Profile"
          onClick={handleProfileClick} 
        />
        <p id="user_name_nav">{userName}</p>
      </div>

      {isModalOpen && (
        <div id="modal_background" onClick={toggleModal}>
          <div id="modal_content" onClick={(e) => e.stopPropagation()}>
            <InvitationsAccept creatorId={userId!} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav2;
