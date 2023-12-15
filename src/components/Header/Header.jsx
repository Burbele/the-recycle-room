import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../../assets/logo.png";
import "../../components/Header/Header.css";

// Header component displaying logo and logout button
export default function Header() {
  // State to store user information
  const [user, setUser] = useState(null);

  // useEffect to listen for changes in authentication state
  useEffect(() => {
    // Get authentication instance
    const auth = getAuth();

    // Set up an event listener for changes in user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function to unsubscribe from the event listener
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Get authentication instance
      const auth = getAuth();

      // Sign out the user
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="HeaderContainer">
      {/* Display logo */}
      <img
        className="logo"
        src={logo}
        alt="logo with text of the recycle room"
      />

      {/* Display logout button if user is authenticated */}
      {user && (
        <CiLogout
          className="logout"
          onClick={handleLogout}
          title="Logout"
        />
      )}
    </div>
  );
}
