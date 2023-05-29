import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "navbar_open" : ""}`}>
      <ul className="navbar__menu">
        <div className="navbar__toggle" onClick={toggleMenu}>
          <span className="navbar__togglebtn_item"></span>
          <span className="navbar__togglebtn_item"></span>
          <span className="navbar__togglebtn_item"></span>
        </div>
        <li className="navbar__item">
          <NavLink
            exact
            to="/information-management"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            기본정보 관리
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            투자유형 관리
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            입출금내역 조회
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            영업내역 조회
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/investments"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            투자내역 조회
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/bonds"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            채권내역 조회
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/sms"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            SMS 관리
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/counseling"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            상담내역 관리
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/inquiries"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__item_active" : " navbar__link  "
            }
          >
            1:1문의내역 조회
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
