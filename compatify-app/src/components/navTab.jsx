import React from "react";

const NavTab = props => {
  const { title, link, onClick, activeTab } = props;
  const baseClass = "nav-link bg-dark text-light";
  const navLink = title === activeTab ? baseClass + " active" : baseClass;

  return (
    <li className="nav-item">
      <a className={navLink} href={link} onClick={() => onClick(title)}>
        {title}
      </a>
    </li>
  );
};

export default NavTab;
