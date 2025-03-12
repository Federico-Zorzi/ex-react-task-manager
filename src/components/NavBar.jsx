import { NavLink } from "react-router-dom";
import { memo } from "react";

const NavBar = memo(() => {
  const pagesLinks = [
    { linkName: "Task List", path: "/" },
    { linkName: "Add Task", path: "/addTask" },
  ];

  return (
    <nav id="navbar">
      <ul>
        {pagesLinks.map((link, i) => (
          <NavLink key={i} to={link.path}>
            <li>{link.linkName}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
});

export default NavBar;
