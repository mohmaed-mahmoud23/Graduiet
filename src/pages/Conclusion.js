"use client";
import React, { useState } from "react";
import "./Conclusion.css";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { FormDataContext } from "../context/FormDataContext"; // 
// صححي المسار حسب مشروعك
const Conclusion = () => {
const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate(); // موجود فعلًا غالبًا

  const [observations, setObservations] = useState([]);
  const [currentObservation, setCurrentObservation] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: [],
  });

  const [conclusions, setConclusions] = useState([]);
  const [currentConclusion, setCurrentConclusion] = useState({
    statement: "",
    correct: null,
  });

  const addObservation = () => {
    if (currentObservation.question.trim()) {
      setObservations([...observations, currentObservation]);
      setCurrentObservation({ question: "", options: ["", "", "", ""], correct: [] });
    }
  };

  const addConclusion = () => {
    if (currentConclusion.statement.trim()) {
      setConclusions([...conclusions, currentConclusion]);
      setCurrentConclusion({ statement: "", correct: null });
    }
  };
const sendToAPI = async (data) => {
  try {
    
    const response = await fetch("http://localhost:4000/api/experiments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data sent successfully!");
      // navigate("/upload"); // لو عايزة تنقلي المستخدم
    } else {
      console.error("Failed to send data.");
    }
  } catch (error) {
    console.error("Error while sending data:", error);
  }
};
const saveData = async () => {
  const updatedFormData = {
    ...formData,
    observations,
    conclusions,
  };

  console.log("📦 Final data to send:", updatedFormData);
  localStorage.setItem("formData", JSON.stringify(updatedFormData));
  setFormData(updatedFormData);

  // ✅ هنا نحول الداتا للشكل اللي الـ API عايزه
  const transformedData = {
    number: 1,
    name: updatedFormData.name || "Untitled",
    description: updatedFormData.description || "",
    domain: updatedFormData.domain || "chemistry",
    subDomain: updatedFormData.subDomain || "",
    basedOn: "",
    experimentImage: [],
    tools: updatedFormData.tools?.map((tool) => tool._id) || [],
    parameters: updatedFormData.parameters?.map((p) => p._id) || [],
    equations: updatedFormData.formulas?.map((f) => f._id) || [],
    observation: updatedFormData.observations?.map((obs) => ({
      question: obs.question,
      options: obs.options.filter(opt => opt && opt.trim() !== "")
    })) || [],
    results: updatedFormData.conclusions?.map((c) => ({
      question: c.statement
    })) || [],
    steps: [
      {
        verb: "mix",
        attrs: [{ key: "example", value: "sample" }]
      }
    ]
  };

  console.log("🧪 Transformed data:", transformedData);

  try {
    const response = await fetch("http://localhost:4000/api/experiments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });

    if (response.ok) {
      console.log("✅ Data saved to API!");
      alert("✅ Data saved successfully!");
    } else {
      console.error("❌ Failed to save data. Status:", response.status);
      alert("❌ Failed to save data to API");
    }
  } catch (error) {
    console.error("❌ Error sending data:", error);
    alert("❌ Error sending data to API");
  }
};
  return (
    <div className="experiment-container">
    
   <div className="title-container">
  <img src="images/Group 955.png" alt="Flask Icon" className="flask-icon" />
  <h2 className="title">Experiment</h2>
</div>
      <div className="section">
        <div className="header">
          <span>Observation</span>
          <button className="add-btn" onClick={addObservation}>+</button>
        </div>
        <input
          className="question-input"
          type="text"
          placeholder="Enter your question..."
          value={currentObservation.question}
          onChange={(e) =>
            setCurrentObservation({ ...currentObservation, question: e.target.value })
          }
        />
        {currentObservation.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="checkbox"
              checked={currentObservation.correct.includes(index)}
              onChange={() => {
                const newCorrect = currentObservation.correct.includes(index)
                  ? currentObservation.correct.filter((i) => i !== index)
                  : [...currentObservation.correct, index];
                setCurrentObservation({ ...currentObservation, correct: newCorrect });
              }}
            />
            <input
              className="option-input"
              type="text"
              placeholder="Option..."
              value={option}
              onChange={(e) => {
                const newOptions = [...currentObservation.options];
                newOptions[index] = e.target.value;
                setCurrentObservation({ ...currentObservation, options: newOptions });
              }}
            />
          </div>
        ))}
      </div>

      <div className="section">
        <div className="header">
          <span>Conclusion</span>
          <button className="add-btn" onClick={addConclusion}>+</button>
        </div>
        <input
          className="question-input"
          type="text"
          placeholder="Enter your conclusion..."
          value={currentConclusion.statement}
          onChange={(e) =>
            setCurrentConclusion({ ...currentConclusion, statement: e.target.value })
          }
        />
        <div className="option">
          <button
            className={currentConclusion.correct === true ? "selected" : ""}
            onClick={() => setCurrentConclusion({ ...currentConclusion, correct: true })}
          >
            ✅
          </button>
          <button
            className={currentConclusion.correct === false ? "selected" : ""}
            onClick={() => setCurrentConclusion({ ...currentConclusion, correct: false })}
          >
            ❌
          </button>
        </div>
      </div>

      <button className="save-btn" onClick={saveData}>Save</button>
    </div>
  );
};

export default Conclusion;