import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Nav.css";
import useScroll from "../../../hooks/useScroll";
import { auth, db } from "../../../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Nav2: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const scrolled = useScroll();
  const [userName, setUserName] = useState<string | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && userId) {
        try {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.username || null);
            setUserImg(userData.img || null);
          } else {
            console.error("No such document!");
            setUserName(null);
            setUserImg(null);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUserName(null);
          setUserImg(null);
        }
      } else {
        setUserName(null);
        setUserImg(null);
      }
    });

    return () => unsubscribe();
  }, [userId]);

 
  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`); 
    } else {
      console.error("User ID is not available.");
    }
  };

  return (
    <nav className={`nav_bar2 ${scrolled ? 'scrolled' : ''}`}>
      <h1 className="app_name">Eventix</h1>
      <ul className="nav_links">
        <li><a aria-label="About us" href="/">ABOUT US</a></li>
        <li><a aria-label="Support" href="/about">SUPPORT</a></li>
      </ul>
      <img
        id="profile_img_nav"
        src={userImg || "https://via.placeholder.com/50"}
        alt="Profile"
        onClick={handleProfileClick} 
        style={{ cursor: "pointer" }} 
      />
      <p id="user_name_nav">{userName || "Guest"}</p>
    </nav>
  );
};

export default Nav2;

