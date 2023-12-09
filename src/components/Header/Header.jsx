import logo from "../../assets/logo.png";
import "../../components/Header/Header.css";

export default function Header() {
  return (
    <>
      <div className="HeaderContainer">
        <img
          className="logo"
          src={logo}
          alt="logo with text of the recycle room"
        />
      </div>
    </>
  );
}
