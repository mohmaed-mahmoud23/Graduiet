import React, { useState, useEffect } from 'react';
import './Information.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { FormDataContext } from "../context/FormDataContext"; // صححي المسار حسب مشروعك

const InformationOfChemical = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate(); // موجود فعلًا غالبًا

  const [experimentName, setExperimentName] = useState(formData.experiment?.experimentName || '');
  const [description, setDescription] = useState(formData.experiment?.description || '');
  const [objective, setObjective] = useState(formData.experiment?.objective || '');

 const handleSave = () => {
  const experimentData = {
    experimentName,
    description,
    objective,
  };

  setFormData({ ...formData, experiment: experimentData });

  console.log("Saved experiment:", experimentData);
  alert("ا✅ Save successful");
  // ✨ بعد الحفظ نرجع لصفحة الدواير
  navigate("/createChemistryExperiments");
};

  return (
    <div className="container">
      <div className="experiment-header">
        <img src="images/Group 955.png" alt="Experiment Icon" className="experiment-icon" />
        <div className="experiment-title">Experiment Information</div>
      </div>

      <div className="form">
        <label className="label">Experiment Name</label>
        <input
          type="text"
          className="input1"
          value={experimentName}
          onChange={(e) => setExperimentName(e.target.value)}
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label">Objective</label>
        <textarea
          className="textarea"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        />
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default InformationOfChemical;