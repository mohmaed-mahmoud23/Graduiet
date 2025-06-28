import React, { useState, useEffect } from "react";
import "./Upload.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormDataContext } from "../context/FormDataContext";
export default function Upload() {
  const [tools, setTools] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
 
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
   const savedTools = formData?.tools?.length
  ? formData.tools
  : JSON.parse(localStorage.getItem("selectedTools")) || [];
    const savedChemicals = JSON.parse(localStorage.getItem("selectedChemicals")) || [];
    setTools(savedTools);
    setChemicals(savedChemicals);
  }, []);
useEffect(() => {
  const storedChemicals = localStorage.getItem("SelectedChemicals");
  if (storedChemicals) {
    setChemicals(JSON.parse(storedChemicals));
  }
}, []);

  return (
    <div className="experiment-container">
      <h2 className="experiment-title">Experiment</h2>

      <div className="experiment-body">
        <div className="left-panel">
          <div className="box">
            {tools.length === 0 && <h3>Tools</h3>}
            <ul>
              {tools.length === 0 ? (
                <li></li>
              ) : (
                tools.map((tool, index) => (
                  <li
                    key={index}
                  >
                    <img
                      src={'/uploads/${tool.image}'}
                      alt={tool.name}
                    />
                    
                  </li>
                ))
              )}
            </ul>
          </div>

    <div className="box">
  {/* ✅ عرض كلمة "Chemicals" فقط لو مفيش مواد */}
  {chemicals.length === 0 && <h3>Chemicals</h3>}

  <ul>
 
    {  chemicals.map((chemical) => (
     
      <li key={chemical.id}>
        <img
          src={`/uploads/${chemical.image}`}
          className="tool-icon selected"
          alt={chemical.name}
          title={chemical.description}
        />
      </li>
    ))}

  </ul>
</div>

        </div>

        <div className="right-panel">
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadedImage(URL.createObjectURL(file));
                }
              }}
            />
            {!uploadedImage ? (
              <span>Upload Image</span>
            ) : (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image-preview"
              />
            )}
          </label>
        </div>
      </div>

      <div className="button-group">
        <button className="back-button">Back</button>
      <button
  className="save-button"
  onClick={() => {
    const fullFormData = {
      tools,
      chemicals,
      image: uploadedImage,
    };
localStorage.setItem("formData", JSON.stringify(fullFormData));
 navigate("/createChemistryExperiments");
    setFormData(fullFormData); // تخزينه في الحالة
    console.log("✅ Saved formData:", fullFormData); // للمراجعة في الكونسول
    alert("Form saved successfully!");
  }}
  
>
  Save
</button>

      </div>
    </div>
  );
}