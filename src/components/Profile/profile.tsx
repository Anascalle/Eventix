import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    birthday: "",
    email: "",
    accountAmount: "",
    img: "",
  });
  const [file, setFile] = useState<File | null>(null);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid; // Get the logged-in user's ID
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data() as typeof user);
        }
      }
    };
    fetchUserData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Save Profile Changes
  const handleSave = async () => {
    try {
      const userId = auth.currentUser?.uid; // Get the logged-in user's ID
      if (!userId) return;

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, user);

      // Optional: Handle file upload logic for profile image
      if (file) {
        // Add your file upload logic here
        console.log("Handle image upload", file);
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div id="user_profile_container">
      <aside id="sidebar">
        <button id="back_button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div id="profile_image_container">
          <img
            id="profile_image"
            src={user.img || "/path-to-placeholder.jpg"}
            alt={user.username}
          />
          <div id="status_icon" />
        </div>

        <h3 id="user_name">{user.username}</h3>
        <p id="user_username">@{user.username}</p>

        <div id="cards">
          <div id="funds_card">
            <span>Amount</span>
            <strong>{user.accountAmount}</strong>
          </div>
        </div>

        <button id="logout_button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <main id="main_content">
        <h2 id="edit_profile_title">Edit Profile</h2>
        <form id="edit_profile_form">
          <label>
            Name
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Birthday
            <input
              type="date"
              name="birthday"
              value={user.birthday || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Funds
            <input
              type="text"
              name="accountAmount"
              value={user.accountAmount || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </main>
    </div>
  );
};

export default UserProfile;
