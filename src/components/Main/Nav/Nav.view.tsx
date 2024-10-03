import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Nav.css";
import useScroll from "../../../hooks/useScroll";
import { auth, db } from "../../../utils/firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Nav2: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const scrolled = useScroll(); 
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!userId) {
          console.error("User ID is undefined.");
          return; // Salir si el userId no está definido
        }

        try {
          const userDocRef = doc(db, "users", userId); 
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.username || null);
          } else {
            console.error("No such document!");
            setUserName(null);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUserName(null);
        }
      } else {
        setUserName(null); 
      }
    });

    return () => unsubscribe(); 
  }, [userId]);

  return (
    <nav className={`nav_bar2 ${scrolled ? 'scrolled' : ''}`}>
      <h1 className="app_name">Eventix</h1>
      <ul className="nav_links">
        <li><a href="/">ABOUT US</a></li>
        <li><a href="/about">SUPPORT</a></li>
      </ul>
      <img id="profile_img_nav" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Porfileimg.webp?alt=media&token=71078af7-b02e-415d-9b56-8002af2a9a15" alt="Profile" />
      <p id="user_name_nav">{userName || "Guest"}</p>
    </nav>
  );
};

export default Nav2;
