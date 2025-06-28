import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const categoriesOfChemical = [
  { name: "Analytical", color: "#b2e2c6", icon: "/images/categories/Group 949.svg", position: { top: 120, left: 30 }  },
  { name: "physical", color: "#feedb5", icon: "/images/categories/Group 950.svg",  position: { top: 370, left: 300 }},
  { name: "organic", color: "#fdc8c2", icon: "/images/categories/Group 952.svg", position: { top:120, left: 545 } },
  { name: "Non-organic", color: "#abb3fe", icon: "/images/categories/Group 951.svg", position: { top: 370, left: 820 } },
];

  
  function ChemistryCategories() {
    const navigate=useNavigate();
      return (
     <>
     <div className='tit'>

      
             <span
  className="back-arrow"
  onClick={() => navigate(-1)}
>
  <img
    alt=""
    src="images/back-arrow.svg"
    style={{ width: '100%', height: '100%'}} // ✅ تملي المساحة كلها
  />
</span>

<h1 className="main-titlee">

        Category Of&nbsp;
        <span style={{ color: "#4BA3C3" }}>C</span>
        <span style={{ color: "#E87B33" }}>h</span>
        <span style={{ color: "#FFD700" }}>e</span>
        <span style={{ color: "#41bb60" }}>m</span>
        <span style={{ color: "#e48fb6" }}>i</span>
        <span style={{ color: "#6c5ca7" }}>s</span>
        <span style={{ color: "#c0d537" }}>t</span>
        <span style={{ color: "#f25d62" }}>r</span>
        <span style={{ color: "#E87B33" }}>y</span>
      </h1>
      </div>

         <div className="science-container">
         
   
       

               <div className='categories-center'>
       <img src="./images/categories/1.png" alt="" className="line line1" />
          <img src="./images/categories/2.png" alt="" className="line line2" />
          <img src="./images/categories/3.png" alt="" className="line line3" />
            
            {/* رسم الدوائر والعناوين */}
           {categoriesOfChemical.map((science, index) => (
  <div 
    key={index}
   onClick={() => navigate(`/experimentsPage?section=${science.name.toLowerCase()}`)}
    className="category-item-wrapper"
    style={{
     fontFamily:'segeo' ,
      top: science.position.top + "px",
      left: science.position.left + "px",
      position: "absolute",
      flexDirection:
                 science.name === "Analytical" ||science.name === "organic"
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
export default ChemistryCategories;