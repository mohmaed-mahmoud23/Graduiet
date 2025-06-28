import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Formula.css";
import { useContext } from "react";
import { FormDataContext } from "../context/FormDataContext"; // تأكدي من المسار
function ChemistryFormula({ formData }) {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormDataContext);

  const [equations, setEquations] = useState([
    [{ type: "element", value: "" }, { type: "operator", value: "" }],
  ]);
  const [parameters, setParameters] = useState([]);
  const operatorOptions = ["+", "→", "null"];

  useEffect(() => {
    fetchChemicalElements();
  }, []);

  const fetchChemicalElements = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/equations");
      const data = await response.json();
      const physicsSymbols = ["V", "I", "R"];
      const filtered = data.filter((p) => !physicsSymbols.includes(p.symbol));
      setParameters(filtered);
    } catch (error) {
      console.error("❌ فشل تحميل العناصر:", error);
    }
  };

  const handleChange = (eqIndex, partIndex, value) => {
    const updatedEquations = [...equations];
    updatedEquations[eqIndex][partIndex].value = value;
    setEquations(updatedEquations);
  };

  const handleOperatorChange = (eqIndex, partIndex, value) => {
    const updatedEquations = [...equations];
    const currentEquation = updatedEquations[eqIndex];

    if (value === "→") {
      const hasArrow = currentEquation.some((part) => part.type === "arrow");
      if (!hasArrow) {
        currentEquation[partIndex] = { type: "arrow", value: "→" };
        currentEquation.splice(partIndex + 1, 0, { type: "element", value: "" });
        currentEquation.splice(partIndex + 2, 0, { type: "operator", value: "" });
      }
    } else {
      currentEquation[partIndex].value = value;
      if (partIndex === currentEquation.length - 1 && value === "+") {
        currentEquation.push({ type: "element", value: "" });
        currentEquation.push({ type: "operator", value: "" });
      }
    }

    setEquations(updatedEquations);
  };

  const addNewEquation = () => {
    setEquations([
      ...equations,
      [{ type: "element", value: "" }, { type: "operator", value: "" }],
    ]);
  };

  const handleSave = () => {
    try {
      const allEquations = [];

      for (let i = 0; i < equations.length; i++) {
        const rawParts = equations[i];
        let formattedInputs = [];
        let outputOperands = [];
        let arrowReached = false;

        for (let j = 0; j < rawParts.length; j++) {
          const current = rawParts[j];

          if (current.type === "arrow") {
            arrowReached = true;
            continue;
          }

          if (!arrowReached && current.type === "element") {
            const matched = parameters.find((p) => p.symbol === current.value);
            if (!matched) continue;

            const next = rawParts[j + 1];
            if (next && next.type === "operator" && next.value !== "→") {
              formattedInputs.push({
                operand: matched._id,
                operator: next.value,
              });
            } else {
              formattedInputs.push({ operand: matched._id });
            }
          } else if (arrowReached && current.type === "element") {
            const matched = parameters.find((p) => p.symbol === current.value);
            if (matched) outputOperands.push(matched._id);
          }
        }

        if (outputOperands.length === 0) {
          alert(' المعادلة غير مكتملة (لا يوجد ناتج)');
          continue;
        }

        allEquations.push({
          eqFormula: {
            inputs: formattedInputs,
            output: outputOperands,
          },
          description: "Generated from chemistry formula",
        });
      }

      // ✅ نخزن في formData
      setFormData((prev) => ({
        ...prev,
        formulas: allEquations,
      }));
    navigate("/createChemistryExperiments");
    alert("ا✅ Save successful");
    } catch (error) {
      console.error("❌ أثناء الحفظ:", error);
      alert("❌ حصل خطأ أثناء الحفظ");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="formula-parameters-container">
        <h2>Chemistry Formula</h2>
        <div className="equation-builder-container">
          <div className="add-equation-header">
            <span className="circle-plus" onClick={addNewEquation}>+</span>
            <span className="add-equation-text">Add New Equation</span>
          </div>

          {equations.map((equation, eqIndex) => (
            <div key={eqIndex} className="equation-builder horizontal">
              {equation.map((part, index) => (
                <div key={index} className="equation-part">
                  {part.type === "element" && (
                    <select
                      value={part.value}
                      onChange={(e) => handleChange(eqIndex, index, e.target.value)}
                    >
                      <option value="">Element</option>
                      {parameters.map((param) => (
                        <option key={param._id} value={param.symbol}>
                          {param.symbol}
                        </option>
                      ))}
                    </select>
                  )}
                  {part.type === "operator" && part.value !== "null" && (
                    <select
                      value={part.value}
                      onChange={(e) => handleOperatorChange(eqIndex, index, e.target.value)}
                    >
                      <option value="">Operator</option>
                      {operatorOptions.map((op, i) => (
                        <option key={i} value={op}>
                          {op === "null" ? "No more" : op}
                        </option>
                      ))}
                    </select>
                  )}
                  {part.type === "arrow" && (
                    <select disabled className="arrow-box">
                      <option value="→">→</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button className="back-button" onClick={handleBack}>Back</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </>
  );
}

export default ChemistryFormula;