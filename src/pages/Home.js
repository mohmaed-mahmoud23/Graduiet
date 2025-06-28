import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth }from "../context/AuthContext"
import './Home.css';

function Home() {
      console.log("Test print from Home");
    const {role} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                const section = document.getElementById(location.state.scrollTo);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 500);
        }
    }, [location]);

    console.log("role", role);
    console.log("From context - role:", role);
  

    return (

        
        <div className="container" id="home">
            {/* Main Content */}
            <main>
                <div className="content">
                <h1 className="main-title">
    <span className="highlight">Online</span> Animated Virtual Labs.<br /> Real Classroom
              </h1>
     <p className="subtitle">Amazing Experiments Teaching Your Favorite Subjects.</p>
                    <div className="subjects">
                    <div className="subject-row">
                        <button 
                            className="physics" 
                            onClick={() => role ? navigate(role === "Teacher" ? "/physicsCategories" : "/physicsCategories") : navigate("/login")}
                        > 
                            Physics
                        </button>
                        <button 
                            className="chemistry" 
                            onClick={() => role ? navigate(role === "Teacher" ? "/chemistryCategories" : "/chemistryCategories") : navigate("/login")}
                        >
                            Chemistry
                        </button>
                        </div>
                        <div className="subject-row">
                        <button className="biology" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>Biology</button>
                        <button className="geology" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>Geology</button>
                        <button className="astronomy" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>Astronomy</button>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <img src="/images/home/scientist.png" alt="Scientist" className="scientist-img" />
                </div>
            </main>

            {/* Courses Section */}
            <section className="courses-section" id="courses">
                <div className="our-courses-container">
                    <h2 className="courses-title">
                     {role?.toLowerCase() === "teacher" && (
               <span>
                        <img
                         src="/images/plus-icon.png"
                          alt="Add Course"
                          className="add-course-icon"
                          onClick={() => navigate("/science")}
                                                  />
                                            </span>
                         )}
                      
                        <span style={{ color: "#2196F3" }}>O</span>
                        <span style={{ color: "#FF6900" }}>u</span>
                        <span style={{ color: "#FFea00" }}>r</span>
                        <span> </span>
                        <span style={{ color: "#2196F3" }}>C</span>
                        <span style={{ color: "#FF6900" }}>o</span>
                        <span style={{ color: "#FFea00" }}>u</span>
                        <span style={{ color: "#008b02" }}>r</span>
                        <span style={{ color: "#ba68c8" }}>c</span>
                        <span style={{ color: "#653294" }}>e</span>
                        <span style={{ color: "#0a9610" }}>s</span>
                        <span style={{ color: "#8bc34a" }}>e</span>
                    </h2>
                </div>
                <div className="courses-container">
                    <div className="course-card" 
                        onClick={() => role ? navigate(role === "Teacher" ? "/physicsCategories" : "/physicsCategories") : navigate("/login")}
                    >
                        <img src="/images/home/physics.png" alt="physics" />
                    </div>
                    <div className="course-card" 
                         onClick={() => role ? navigate(role === "Teacher" ? "/chemistryCategories" : "/chemistryCategories") : navigate("/login")}
                    >
                        <img src="/images/home/chemistry.png" alt="chemistry" />
                    </div>
                    <div className="course-card" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>
                        <img src="/images/home/geology-exploration.png" alt="Geology Exploration" />
                    </div>
                    <div className="course-card" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>
                        <img src="/images/home/biology.png" alt="biology" />
                    </div>
                    <div className="course-card" onClick={() => role ? alert("Coming soon!") : navigate("/login")}>
                        <img src="/images/home/astronomy.png" alt="astronomy" />
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <div className="about-section" id="about">
                <div className="about-text">
                    <h2 className="about-title">
                        <span style={{ color: "#2196F3" }}>A</span>
                        <span style={{ color: "#FF6900" }}>b</span>
                        <span style={{ color: "#FFea00" }}>o</span>
                        <span style={{ color: "#008000" }}>u</span>
                        <span style={{ color: "#f06292" }}>t</span>
                        <span> </span>
                        <span style={{ color: "#8bc34a" }}>U</span>
                        <span style={{ color: "#d32f2f" }}>s</span>
                    </h2>
                    <p className="about-desc">WE are Here To Make Chemistry  
            <span style={{ color: "#2196F3",fontWeight:'bold' }}> F</span>
            <span style={{ color: "#008000" ,fontWeight:'bold'}}>U</span>
            <span style={{ color: "#f06292",fontWeight:'bold' }}>N</span> and   <span className="easy">
            <span style={{ color: "#d32f2f" ,fontWeight:'bold'}}>E</span>
            <span style={{ color: "#8bc34a" ,fontWeight:'bold'}}>A</span>
            <span style={{ color: "#2196F3" ,fontWeight:'bold'}}>S</span>
            <span style={{ color: "#008000",fontWeight:'bold' }}>Y</span>
          </span></p>
      <p className="about-desc">To Understand For Every One</p>
      <p>Discover The  <span style={{ color: "#2196F3" ,fontWeight:'bold' }}>W</span>
            <span style={{ color: "#FF6900" ,fontWeight:'bold' }}>O</span>
            <span style={{ color: "#FFea00" ,fontWeight:'bold'}}>r</span>
            <span style={{ color: "#008000" ,fontWeight:'bold'}}>l</span>
            <span style={{ color: "#f06292" ,fontWeight:'bold'}}>d</span> Of Elements and Reactions with Us</p>
                </div>
                <div className="about-image">
                    <img src="/images/home/scientist-boy.png" alt="Scientist Boy" />
                </div>
            </div>
            
        </div>
    );
}

export default Home;