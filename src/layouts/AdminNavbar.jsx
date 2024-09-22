import React from "react";

const AdminNavbar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ width: "280px", maxWidth: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">XYZ Hotel</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-house"></i>
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-bag"></i>
            Orders
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-archive"></i>
            Rooms
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white active">
            <i className="bi bi-people"></i>
            Users
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
