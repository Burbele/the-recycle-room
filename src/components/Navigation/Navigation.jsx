import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">Item Search</NavLink>
      <NavLink to="/recyclinginformation">Information</NavLink>
    </nav>
  );
}
