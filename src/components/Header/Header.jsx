import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../../assets/logo.png";
import "../../components/Header/Header.css";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="HeaderContainer">
      <img
        className="logo"
        src={logo}
        alt="logo with text of the recycle room"
      />
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
