import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { role, setRole } = useAuth();
  const isLoggedIn = !!role;

  // باقي الكود زي ما هو

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
  const isLoggedOut = sessionStorage.getItem("loggedOut");
  if (isLoggedOut === "true") {
    setRole(null);
    return;
  }

  const activeRole = sessionStorage.getItem("activeRole");
  const storedRole = localStorage.getItem("role");

  if (activeRole) {
    setRole(activeRole);
  } else if (storedRole) {
    setRole(storedRole);
  } else {
    setRole(null);
  }
}, [location, setRole]);


  const handleLogout = () => {
  console.log('logged')
sessionStorage.removeItem("user");
sessionStorage.removeItem("activeRole");
sessionStorage.setItem("loggedOut", "true"); // ✅ مهم جدًا

  setRole(null);
  // window.location.reload();
  setTimeout(() => {
    navigate("/");
  }, 100);
};

  const handleNavigation = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  return (
    <header>
      <div className="navbar">
           <div className="logo">
        <img src="/images/logo.png" alt="Science Lab Logo" />
      </div>
      <nav>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("home");
          }}
          style={{ cursor: "pointer" }}
        >
          Home
        </a>
        <a
          href="#courses"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("courses");
          }}
          style={{ cursor: "pointer" }}
        >
          Courses
        </a>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("about");
          }}
          style={{ cursor: "pointer" }}
        >
          About Us
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("contact");
          }}
          style={{ cursor: "pointer" }}
        >
          Contact Us
        </a>
      </nav>

      </div>
   
      <div className="nav-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        ) : (
          location.pathname !== "/Login" &&
          location.pathname !== "/SignUp" && (
            <>
              <Link to="/SignUp">
                <button className="signup">Sign Up</button>
              </Link>
              <Link to="/Login">
                <button className="login">Log In</button>
              </Link>
            </>
          )
        )}
      </div>
    </header>
  );
}

export default Navbar;