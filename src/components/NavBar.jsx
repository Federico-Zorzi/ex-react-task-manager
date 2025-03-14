import { NavLink } from "react-router-dom";
import { memo } from "react";

const NavBar = memo(() => {
  const pagesLinks = [
    { linkName: "Task List", path: "/" },
    { linkName: "Add Task", path: "/addTask" },
  ];

  return (
    <nav id="navbar">
      <div id="logo">
        <NavLink to={"/"}>
          <i className="fa-solid fa-list-check fa-xl"></i>
        </NavLink>
      </div>
      <div id="links">
        <ul>
          {pagesLinks.map((link, i) => (
            <NavLink key={i} to={link.path}>
              <li>{link.linkName}</li>
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
});

export default NavBar;
