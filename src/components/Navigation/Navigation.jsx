import { NavLink } from "react-router-dom";

// Navigation component using React Router's NavLink
export default function Navigation() {
  return (
    // Navigation bar
    <nav>
      {/* NavLink for navigating to the Item Search page (Home) */}
      <NavLink
        to="/"
        activeClassName="active-link"
        exact>
        Item Search
      </NavLink>
      {/* NavLink for navigating to the Recycling Information page */}
      <NavLink
        to="/recyclinginformation"
        activeClassName="active-link">
        Information
      </NavLink>
      {/* NavLink for navigating to the Question & Answer page */}
      <NavLink
        to="/questionanswer"
        activeClassName="active-link">
        Q&A
      </NavLink>
    </nav>
  );
}
