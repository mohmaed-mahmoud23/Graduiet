import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./formula.css";

const Formula = () => {
  const [equations, setEquations] = useState([
    [
      { type: "input", value: "" },
      { type: "operator", value: "" },
    ],
  ]);
  const [parameters, setParameters] = useState([]);
  const [savedEquations, setSavedEquations] = useState([]);

  const navigate = useNavigate();
  const baseOperators = ["+", "-", "*", "/", "="];

  const handleInputChange = (eqIndex, partIndex, value) => {
    const updatedEquations = [...equations];
    updatedEquations[eqIndex][partIndex].value = value;
    setEquations(updatedEquations);
  };

  const handleOperatorChange = (eqIndex, partIndex, value) => {
    const updatedEquations = [...equations];
    updatedEquations[eqIndex][partIndex].value = value;

    const currentEquation = updatedEquations[eqIndex];
    if (partIndex === currentEquation.length - 1) {
      if (value === "=") {
        currentEquation.push({ type: "value", value: "" });
      } else {
        currentEquation.push({ type: "input", value: "" });
        currentEquation.push({ type: "operator", value: "" });
      }
    }

    setEquations(updatedEquations);
  };

  const handleValueChange = (eqIndex, partIndex, value) => {
    const updatedEquations = [...equations];
    updatedEquations[eqIndex][partIndex].value = value;
    setEquations(updatedEquations);
  };

  const fetchParameters = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/parameters");
      const data = await response.json();
      const physicsSymbols = ["R", "I", "V"];

      const physicsOnly = data.filter((param) =>
        physicsSymbols.includes(param.symbol)
      );

      setParameters(physicsOnly);
    } catch (error) {
      console.error("❌ Failed to load parameters:", error);
    }
  };

  const fetchEquations = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/equations");
      const data = await response.json();
      setSavedEquations(
        data.map((eq) =>
          eq.eqFormula?.inputs?.length > 0 ? eq.eqFormula.inputs : []
        )
      );
    } catch (err) {
      console.error("❌ فشل في جلب المعادلات:", err);
    }
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < equations.length; i++) {
        const rawParts = equations[i];
        let formatted = [];

        for (let j = 0; j < rawParts.length; j++) {
          const current = rawParts[j];

          if (current.type === "operator" && current.value === "=") break;

          if (current.type === "input") {
            const next = rawParts[j + 1];
            const matched = parameters.find((p) => p.symbol === current.value);
            if (!matched) continue;

            let operator = "";
            if (next && next.type === "operator" && next.value !== "=") {
              operator = next.value;
            }

            if (operator) {
              formatted.push({ operand: matched._id, operator });
            } else {
              formatted.push({ operand: matched._id });
            }
          }
        }

        const equalIndex = rawParts.findIndex(
          (p) => p.type === "operator" && p.value === "="
        );

        let outputOperand = null;
        if (
          equalIndex !== -1 &&
          rawParts[equalIndex + 1] &&
          rawParts[equalIndex + 1].value
        ) {
          const outputParam = parameters.find(
            (p) => p.symbol === rawParts[equalIndex + 1].value
          );
          outputOperand = outputParam?._id || null;
        }

        if (!outputOperand) {
          alert(`❌ المعادلة رقم ${i + 1} غير مكتملة (مافيش output)`);
          continue;
        }

        console.log(`📌 المعادلة رقم ${i + 1}:`);
        console.log("🔹 Inputs:");
        formatted.forEach((inp, index) => {
          const symbol =
            parameters.find((p) => p._id === inp.operand)?.symbol || "unknown";
          console.log(
            `${index + 1}. operand ID: ${
              inp.operand
            }, operand: ${symbol}, operator: ${inp.operator || "="}`
          );
        });

        console.log("🔹 Outputs:");
        const outSymbol =
          parameters.find((p) => p._id === outputOperand)?.symbol || "unknown";
        console.log(`1. output ID: ${outputOperand}, operand: ${outSymbol}`);

        const payload = {
          eqFormula: {
            inputs: formatted,
            output: [outputOperand],
          },
          description: "Generated from formula builder",
        };

        if (!window.formData) window.formData = {};
        window.formData.formulas = [
          ...(window.formData.formulas || []),
          payload,
        ];
      }

      alert("✅ تم حفظ معادلات الفيزياء مؤقتًا في object");
    } catch (error) {
      console.error("❌ خطأ أثناء الحفظ:", error);
      alert("❌ حدث خطأ أثناء الحفظ: " + error.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const addNewEquation = () => {
    setEquations([
      ...equations,
      [
        { type: "input", value: "" },
        { type: "operator", value: "" },
      ],
    ]);
  };

  useEffect(() => {
    fetchParameters();
    fetchEquations();
  }, []);

  return (
    <>
      <div className="formula-parameters-container">
        <h2>Physics Formula</h2>
        <div className="equation-builder-container">
          <div className="add-equation-header">
            <span className="circle-plus" onClick={addNewEquation}>
              +
            </span>
            <span className="add-equation-text">Add New Equation</span>
          </div>

          {equations.map((equationParts, eqIndex) => (
            <div key={eqIndex} className="equation-builder horizontal">
              {equationParts.map((part, index) => (
                <div key={index} className="equation-part">
                  {part.type === "input" && (
                    <select
                      value={part.value}
                      onChange={(e) =>
                        handleInputChange(eqIndex, index, e.target.value)
                      }
                    >
                      <option value="">Input</option>
                      {parameters.map((param) => (
                        <option key={param._id} value={param.symbol}>
                          {param.symbol}
                        </option>
                      ))}
                    </select>
                  )}
                  {part.type === "operator" && (
                    <select
                      value={part.value}
                      onChange={(e) =>
                        handleOperatorChange(eqIndex, index, e.target.value)
                      }
                    >
                      <option value="">Operator</option>
                      {baseOperators.map((op, opIndex) => (
                        <option key={opIndex} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  )}
                  {part.type === "value" && (
                    <select
                      value={part.value}
                      onChange={(e) =>
                        handleValueChange(eqIndex, index, e.target.value)
                      }
                    >
                      <option value="">Value</option>
                      {parameters.map((param) => (
                        <option key={param._id} value={param.symbol}>
                          {param.symbol}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default Formula;
