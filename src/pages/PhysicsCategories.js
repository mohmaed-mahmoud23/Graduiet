import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categoriesOfPhysics = [
  {
    name: "Thermal",
    color: "#b2e2c6",
    icon: "/images/categories/Group 949.svg",
    position: { top: 120, left: 30 },
  },
  {
    name: "Electrical",
    color: "#feedb5",
    icon: "/images/categories/Group 950.svg",
    position: { top: 370, left: 300 },
  },
  {
    name: "Mechanical",
    color: "#fbd108",
    icon: "/images/categories/Group 968.svg",
    position: { top: 120, left: 545 },
  },
  {
    name: "Modern",
    color: "#fdc8c2",
    icon: "/images/categories/Group 969.svg",
    position: { top: 370, left: 820 },
  },
];

function PhysicsCategories() {
  const navigate = useNavigate();
  return (
    <>
      <div className="tit">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <img
            alt=""
            src="/images/back-arrow.svg"
            style={{ width: "100%", height: "100%", objectFit: "contain" }} // ✅ تملي المساحة كلها
          />
        </span>
        <h1 className="main-titlee">
          Category Of&nbsp;
          <span style={{ color: "#4BA3C3" }}>P</span>
          <span style={{ color: "#E87B33" }}>h</span>
          <span style={{ color: "#7EC640" }}>y</span>
          <span style={{ color: "#B86FC8" }}>s</span>
          <span style={{ color: "#FFD700" }}>i</span>
          <span style={{ color: "#A5E6C6" }}>c</span>
          <span style={{ color: "#FF5E5E" }}>s</span>
        </h1>
      </div>

      <div className="science-container">
        <div className="categories-center">
          <img src="./images/categories/1.png" alt="" className="line line1" />
          <img src="./images/categories/2.png" alt="" className="line line2" />
          <img src="./images/categories/3.png" alt="" className="line line3" />

          {/* رسم الدوائر والعناوين */}
          {categoriesOfPhysics.map((science, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(
                  `/experimentsPage?section=${science.name.toLowerCase()}`
                )
              }
              className={"category-item-wrapper"}
              style={{
                fontFamily: "segeo",
                top: science.position.top + "px",
                left: science.position.left + "px",
                position: "absolute",
                flexDirection:
                  science.name === "Mechanical" || science.name === "Thermal"
                    ? "column"
                    : "column-reverse", // مهم لو بتحددي top/left
              }}
            >
              <p className="category-name">{science.name}</p>
              <div
                className="circle-item"
                style={{ backgroundColor: science.color }}
              >
                <img src={science.icon} alt={science.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PhysicsCategories;
