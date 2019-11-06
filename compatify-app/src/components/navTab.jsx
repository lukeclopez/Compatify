import React from "react";

const NavTab = props => {
  const { title, link, onClick, activeTab } = props;
  const navLink = title === activeTab ? "nav-link active" : "nav-link";

  return (
    <li className="nav-item">
      <a className={navLink} href={link} onClick={() => onClick(title)}>
        {title}
      </a>
    </li>
  );
};

export default NavTab;
