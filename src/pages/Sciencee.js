import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Science.css';

const Sciences = [
  { name: "Physics", color: "#c0d537", icon: "/images/categories/Group 956.svg", position: { top: 150, left: 204 } },
  { name: "Astronomy", color: "#34b655", icon: "/images/categories/Group 957.svg", position: { top: 320, left: 400 } },
  { name: "Geology", color: "#e16734", icon: "/images/categories/Group 958.svg", position: { top: 140, left: 640 } },
  { name: "Biology", color: "#fbd209", icon: "/images/categories/Group 959.svg", position: { top: 320, left: 880 } },
  { name: "Chemistry", color: "#A5E6C6", icon: "/images/categories/Group 960.svg", position: { top: 150, left:1150 } },
];

function Science() {
  const navigate=useNavigate();
  return (
    <>
    
  
<div className='ti'>

         <span
  className="backk-arrow"
  onClick={() => navigate(-1)}
>
  <img
    alt=""
    src="/images/back-arrow.svg"
     style={{ width: '100%', height: '100%' ,objectFit:'contain'}} // ✅ تملي المساحة كلها
  />
</span>
      <h1 className="mainn-title">
  

        <span style={{ color: "#43c8e3" }}>S</span>
        <span style={{ color: "#e16734" }}>c</span>
        <span style={{ color: "#fbd209" }}>i</span>
        <span style={{ color: "#34b655" }}>e</span>
        <span style={{ color: "#e48fb6" }}>n</span>
        <span style={{ color: "#34b655" }}>c</span>
        <span style={{ color: "#8578b6" }}>e</span>
        <span style={{ color: "#c0d537" }}>s</span>
      </h1>
</div>

       <div className="sciencee-container1">

        <div className='categories-center1'>
      <img src="/images/categories/1.png" alt="" className="linee line11" />
      <img src="/images/categories/2.png" alt="" className="linee line22" />
      <img src="/images/categories/3.png" alt="" className="linee line33" />
      <img src="/images/categories/2.png" alt="" className="linee line44" />

      {Sciences.map((item, index) => (
        <div 
          key={index}
          className={`categoryy-item-wrapper ${["Physics", "Geology", "Chemistry"].includes(item.name) ? "reversee-order" : ""}`}
          style={{ fontFamily:'segeo' ,
            top: item.position.top + "px",
            left: item.position.left + "px",
          }}
          onClick={()=>{
          if (item.name==="Physics"){
            navigate("/physicsCategories");}
            else if (item.name==="Chemistry"){
              navigate("/chemistryCategories");
            }
          }
          }
        >
          <div className="circlee-item" style={{ backgroundColor: item.color }}>
            <img src={item.icon} alt={item.name} />
          </div>
          <p className="categoryy-name">{item.name}</p>
        </div>
      ))}
    </div>
    </div>
    </>
  );
}

export default Science;