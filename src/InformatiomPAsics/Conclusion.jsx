"use client";
import React, { useState } from "react";
import "./Conclusion.css";

const Conclusion = ({ formData, setFormData }) => {
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
    const response = await fetch("https://your-api-url.com/submit", {
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
  // ضيفي البيانات الحالية للمخزن
  const updatedFormData = {
    ...formData,
    observations,
    conclusions,
  };

  // خزنيها لو حبيتي في localStorage كنسخة احتياطية
  localStorage.setItem("formData", JSON.stringify(updatedFormData));

  // حفظها في formData
  setFormData(updatedFormData);

  try {
    const response = await fetch("http://localhost:4000/api/experiments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });

    if (response.ok) {
      console.log("Data saved successfully to API");
      alert("✅ Data saved successfully!");
    } else {
      console.error("❌ Failed to save data");
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
  <img src="/flask-icon.jpg" alt="Flask Icon" className="flask-icon" />
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
