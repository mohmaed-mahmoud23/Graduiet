"use client";
import React, { useState, useContext } from "react";
import "./Conclusion.css";
import { useNavigate } from "react-router-dom";
import { FormDataContext } from "../context/FormDataContext";

const Conclusion = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

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
      setCurrentObservation({
        question: "",
        options: ["", "", "", ""],
        correct: [],
      });
    }
  };

  const addConclusion = () => {
    if (currentConclusion.statement.trim()) {
      setConclusions([...conclusions, currentConclusion]);
      setCurrentConclusion({ statement: "", correct: null });
    }
  };

  // ✅ دالة الحفظ اللي انت طلبتها
  const handleSave = () => {
    const experimentData = {
      experimentName: formData.experimentName || "",
      description: formData.description || "",
      objective: formData.objective || "",
      observations,
      conclusions,
    };

    setFormData({ ...formData, experiment: experimentData });
    console.log("Saved experiment:", experimentData);
    alert("✅ Save successful");
    navigate("/createChemistryExperiments");
  };

  return (
    <div className="experiment-container">
      <div className="title-container">
        <img
          src="images/Group 955.png"
          alt="Flask Icon"
          className="flask-icon"
        />
        <h2 className="title">Experiment</h2>
      </div>

      <div className="section">
        <div className="header">
          <span>Observation</span>
          <button className="add-btn" onClick={addObservation}>
            +
          </button>
        </div>
        <input
          className="question-input"
          type="text"
          placeholder="Enter your question..."
          value={currentObservation.question}
          onChange={(e) =>
            setCurrentObservation({
              ...currentObservation,
              question: e.target.value,
            })
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
                setCurrentObservation({
                  ...currentObservation,
                  correct: newCorrect,
                });
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
                setCurrentObservation({
                  ...currentObservation,
                  options: newOptions,
                });
              }}
            />
          </div>
        ))}
      </div>

      <div className="section">
        <div className="header">
          <span>Conclusion</span>
          <button className="add-btn" onClick={addConclusion}>
            +
          </button>
        </div>
        <input
          className="question-input"
          type="text"
          placeholder="Enter your conclusion..."
          value={currentConclusion.statement}
          onChange={(e) =>
            setCurrentConclusion({
              ...currentConclusion,
              statement: e.target.value,
            })
          }
        />
        <div className="option">
          <button
            className={currentConclusion.correct === true ? "selected" : ""}
            onClick={() =>
              setCurrentConclusion({ ...currentConclusion, correct: true })
            }
          >
            ✅
          </button>
          <button
            className={currentConclusion.correct === false ? "selected" : ""}
            onClick={() =>
              setCurrentConclusion({ ...currentConclusion, correct: false })
            }
          >
            ❌
          </button>
        </div>
      </div>

      {/* ✅ زرار الحفظ مع الدالة الجديدة */}
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Conclusion;
