import { PlusIcon } from "@heroicons/react/24/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const verbTemplates = {
  Measure: [
    "Value",
    "Unit",
    "OF",
    "Parameter",
    "USING",
    "Tools",
    "IN",
    "Tools",
  ],
  Pour: ["Parameter", "FROM", "Tools", "INTO", "Tools"],
  Add: [
    "Value",
    "Unit",
    "OF",
    "Parameter",
    "TO",
    "Value",
    "Unit",
    "OF",
    "Parameter",
    "USING",
    "Tools",
    "IN",
    "Tools",
  ],
  Put: ["Value", "Unit", "OF", "Parameter", "INTO", "Tools"],
  Insert: ["Tools", "INTO", "Tools"],
  Heat: ["Parameter", "BY", "Value", "Unit", "USING", "Tools"],
  Decrease: ["Value", "Unit", "OF", "Parameter", "USING", "Tools"],
  Increase: ["Parameter", "BY", "Value", "Unit", "USING", "Tools"],
  Pull: ["Tools"],
  Mix: [
    "Value",
    "Unit",
    "OF",
    "Parameter",
    "WITH",
    "Value",
    "Unit",
    "OF",
    "Parameter",
    "BY",
    "Tools",
  ],
};

const parameterOptions = ["Temperature", "Volume", "Mass", "Time"];

export default function ExperimentSteps() {
  const [steps, setSteps] = useState([]);
  const [selectedVerb, setSelectedVerb] = useState("Measure");
  const [showVerbPanel, setShowVerbPanel] = useState(false);
  const [newVerbMode, setNewVerbMode] = useState(false);
  const [newVerb, setNewVerb] = useState("");
  const [newVerbTemplate, setNewVerbTemplate] = useState([]);

  const handleAddStep = () => {
    const verbToUse = newVerbMode ? newVerb.trim() : selectedVerb;
    if (!verbToUse) return;

    if (newVerbMode && !verbTemplates[verbToUse]) {
      verbTemplates[verbToUse] =
        newVerbTemplate.length > 0 ? newVerbTemplate : ["Parameter"];
    }

    setSteps([
      ...steps,
      {
        id: `step-${Date.now()}`,
        verb: verbToUse,
        values: verbTemplates[verbToUse].map((item) => ({
          type: item,
          value: "",
        })),
      },
    ]);

    setNewVerb("");
    setNewVerbTemplate([]);
    setNewVerbMode(false);
    setShowVerbPanel(false);
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSteps = Array.from(steps);
    const [movedItem] = newSteps.splice(result.source.index, 1);
    newSteps.splice(result.destination.index, 0, movedItem);
    setSteps(newSteps);
  };

  const handleValueChange = (stepId, index, newValue) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              values: step.values.map((item, i) =>
                i === index ? { ...item, value: newValue } : item
              ),
            }
          : step
      )
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/equations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps }),
      });

      if (!response.ok) throw new Error("Failed to save steps");
      const data = await response.json();
      alert("Steps saved successfully!");
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error saving steps:", error);
      alert("Failed to save steps");
    }
  };

  const renderInputField = (type, value, onChange) => {
    const commonClasses =
      "border border-cyan-300 rounded px-2 py-1 text-sm shadow-sm";

    switch (type) {
      case "Value":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} w-24`}
            placeholder={type}
          />
        );
      case "Parameter":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} w-28`}
          >
            <option value="">Select parameter</option>
            {parameterOptions.map((param) => (
              <option key={param} value={param}>
                {param}
              </option>
            ))}
          </select>
        );
      case "Unit":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} w-20`}
          >
            <option value="">Select</option>
            <option value="mL">mL</option>
            <option value="g">g</option>
            <option value="°C">°C</option>
          </select>
        );
      case "Tools":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} w-28`}
          >
            <option value="">Select tool</option>
            <option value="Beaker">Beaker</option>
            <option value="Pipette">Pipette</option>
          </select>
        );
      default:
        return (
          <span className="text-sm font-medium text-cyan-800">{type}</span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-cyan-900">
        Steps of Experiment
      </h1>
      <div className="bg-cyan-100 p-6 rounded-2xl shadow-inner">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowVerbPanel(!showVerbPanel)}
            className="text-white bg-sky-500 hover:bg-sky-600 rounded-full p-1 shadow"
            aria-label="Add step"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold text-cyan-800">Add Steps</h2>
        </div>

        {showVerbPanel && (
          <div className="flex items-center gap-4 mb-6 bg-white p-3 rounded-lg border border-cyan-300">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-cyan-700">
                Command:
              </span>
              {newVerbMode ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Verb name"
                    value={newVerb}
                    onChange={(e) => setNewVerb(e.target.value)}
                    className="border border-cyan-300 rounded px-2 py-1 text-sm w-24 shadow-sm"
                  />
                  <select
                    multiple
                    value={newVerbTemplate}
                    onChange={(e) => {
                      const selected = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setNewVerbTemplate(selected);
                    }}
                    className="border border-cyan-300 rounded px-2 py-1 text-sm w-60 shadow-sm h-20"
                  >
                    {[
                      "Value",
                      "Unit",
                      "Parameter",
                      "Tools",
                      "FROM",
                      "TO",
                      "WITH",
                      "INTO",
                      "USING",
                      "BY",
                      "IN",
                      "OF",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <select
                  value={selectedVerb}
                  onChange={(e) => {
                    if (e.target.value === "__new__") {
                      setNewVerbMode(true);
                      setSelectedVerb("");
                    } else {
                      setSelectedVerb(e.target.value);
                    }
                  }}
                  className="border border-cyan-300 rounded px-3 py-1 text-sm shadow-sm"
                >
                  {Object.keys(verbTemplates).map((verb) => (
                    <option key={verb} value={verb}>
                      {verb}
                    </option>
                  ))}
                  <option value="__new__">+ Add new command...</option>
                </select>
              )}
            </div>

            <button
              onClick={handleAddStep}
              disabled={newVerbMode && !newVerb.trim()}
              className="text-white bg-cyan-600 hover:bg-cyan-700 rounded px-3 py-1 text-sm shadow"
            >
              Add
            </button>
          </div>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[200px] bg-cyan-50 p-4 rounded-xl border border-dashed border-cyan-300"
              >
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-wrap items-center gap-2 mb-4 bg-white p-4 rounded-xl border ${
                          snapshot.isDragging
                            ? "border-cyan-400 ring-2 ring-cyan-400"
                            : "border-cyan-200"
                        } shadow-sm transition-colors duration-200`}
                      >
                        <span className="font-semibold text-cyan-800 min-w-[70px] bg-cyan-100 px-3 py-1 rounded">
                          {step.verb}
                        </span>
                        {step.values.map((item, i) => (
                          <div key={`${step.id}-${i}`}>
                            {renderInputField(
                              item.type,
                              item.value,
                              (newValue) =>
                                handleValueChange(step.id, i, newValue)
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => handleDeleteStep(step.id)}
                          className="text-red-500 hover:text-red-700 ml-auto"
                        >
                          <img
                            src="/pasket.png"
                            alt="delete"
                            className="h-5 w-5"
                          />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {steps.length === 0 && (
                  <div className="text-gray-400 italic p-2 text-center">
                    No steps added yet.
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-end mt-10 gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-1.5 rounded-2xl shadow text-sm">
          Back
        </button>
        <button
          onClick={handleSave}
          disabled={steps.length === 0}
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-1.5 rounded-2xl shadow text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
    </div>
  );
}
