import React from "react";

const Sidebar = ({ activeSidebar }) => {
  return (
    <div>
      <div id="sidebar" className={activeSidebar ? "active" : ""}>
        <div className="logo">
          <a href="/">My Super APP</a>
        </div>
        <div className="nav">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/project">Project</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;