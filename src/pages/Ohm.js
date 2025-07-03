import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableTool from "../pages/DraggableTool";
import "../pages/PotassiumNitrateExperiment.css";

const tools = [
  { name: "Wire", image: "/Exe(1)/Group 999.png" },
  { name: "Ammeter", image: "/Exe(1)/Group 1000.png" },
  { name: "Voltmeter", image: "/Exe(1)/Group 1001.png" },
];

const chemicals = [
  { name: "Copper", image: "/Exe(1)/Group 1003.png" },
  { name: "Batteries", image: "/Exe(1)/Group 1002.png" },
];

const experimentSteps = [
  "Insert battery TO The Device.",
  "Insert the wire To The device.",
  "Insert Copper INTO The Device.",
  "Increase Voltage BY Voltmeter.",
  "Decrease Resistance.",
  "Read Current.",
  "V = I R",
];

function Ohm() {
  const [flashZone, setFlashZone] = useState(null);
  const [mode, setMode] = useState("student");
  const [retortItems, setRetortItems] = useState([]);
  const [bowlItems, setBowlItems] = useState([]);
  const [flaskItems, setFlaskItems] = useState([]);
  const [voltage, setVoltage] = useState(5); // 🔴 V
  const [resistance, setResistance] = useState(5); // 🟢 R
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [reactionState, setReactionState] = useState({
    retort: false,
    ice: false,
    flask: false,
  });

  const triggerFlash = (zone) => {
    setFlashZone(zone);
    setTimeout(() => setFlashZone(null), 600);
  };

  const handleDrop = (zone, item) => {
    triggerFlash(zone);
    if (zone === "retort" && item.name === "Retort") {
      setReactionState((prev) => ({ ...prev, retort: true }));
    } else if (zone === "bowl" && item.name === "Ice") {
      setReactionState((prev) => ({ ...prev, ice: true }));
    } else if (zone === "flask" && item.name === "Flask") {
      setReactionState((prev) => ({ ...prev, flask: true }));
    }
  };

  const [, dropRetort] = useDrop({
    accept: "TOOL",
    drop: (item) => {
      setRetortItems([item]);
      handleDrop("retort", item);
    },
  });

  const [, dropBowl] = useDrop({
    accept: "TOOL",
    drop: (item) => {
      setBowlItems([item]);
      handleDrop("bowl", item);
    },
  });

  const [, dropFlask] = useDrop({
    accept: "TOOL",
    drop: (item) => {
      setFlaskItems([item]);
      handleDrop("flask", item);
    },
  });

  const formatStepText = (text) => {
    if (typeof text !== "string") return "";

    if (text === "V = I R") {
      return `
        <span class="text-red-600 font-bold">V</span> = 
        <span class="text-purple-600 font-bold">I</span> 
        <span class="text-blue-600 font-bold">R</span>
      `;
    }

    return text
      .replace(
        /(Insert battery TO The Device\.)/gi,
        '<span class="green">$1</span>'
      )
      .replace(
        /(Insert the wire To The device\.)/gi,
        '<span class="blue">$1</span>'
      )
      .replace(
        /(Insert Copper INTO The Device\.)/gi,
        '<span class="green">$1</span>'
      )
      .replace(
        /(Increase Voltage BY Voltmeter\.)/gi,
        '<span class="orange">$1</span>'
      )
      .replace(/(Decrease Resistance\.)/gi, '<span class="orange">$1</span>')
      .replace(/(Read Current\.)/gi, '<span class="green">$1</span>');
  };

  return (
    <div className="pl-12 experiment-layout">
      <div className="left-panel mr-24">
        <div className="mode-switch">
          <img
            src="/ImageDrage/Group 910.png"
            alt="Robot"
            onClick={() => setMode("robot")}
            className={mode === "robot" ? "active" : ""}
          />
          <img
            src="/ImageDrage/Group 912.png"
            alt="Student"
            onClick={() => setMode("student")}
            className={mode === "student" ? "active" : ""}
          />
        </div>

        <div className="mx-auto">
          <h3 className="text-center text-2xl text-black font-extrabold">
            Tools
          </h3>
          <div className="grid">
            {tools.map((tool, index) => (
              <DraggableTool key={index} tool={tool} />
            ))}
          </div>
        </div>

        <div className="ml-24 mt-10">
          <h3 className="text-center text-2xl text-black font-extrabold whitespace-nowrap">
            Materials
          </h3>
          <div className="flex gap-2">
            {chemicals.map((chem, index) => (
              <DraggableTool key={index} tool={chem} />
            ))}
          </div>
        </div>
      </div>

      <div className="center-panel relative">
        <div className="device-box">
          <h2 className="device-title text-center font-bold text-2xl">
            Ohm's Law
          </h2>
          <div className="device-content relative mb-0">
            <div className="puzzle-layout relative mt-40">
              <img
                src="/Exe(1)/Device - Copy.png"
                alt="experiment structure"
                className="puzzle-background w-full h-auto"
              />

              {/* Drop Zones */}
              <div
                ref={dropRetort}
                className={`absolute top-[22%] left-[15%] w-[20%] h-[25%] drop-zone puzzle-retort ${
                  reactionState.retort ? "correct" : ""
                } ${flashZone === "retort" ? "flash-effect" : ""}`}
              >
                {retortItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    className="absolute top-[10%] left-[10%] w-[80%]"
                  />
                ))}
              </div>

              <div
                ref={dropBowl}
                className={`absolute top-[60%] left-[52%] w-[20%] h-[20%] drop-zone puzzle-bowl ${
                  reactionState.ice ? "correct" : ""
                } ${flashZone === "bowl" ? "flash-effect" : ""}`}
              >
                {bowlItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    className="absolute top-[20%] left-[20%] w-[60%]"
                  />
                ))}
              </div>

              <div
                ref={dropFlask}
                className={`absolute top-[53%] left-[63%] w-[10%] h-[20%] drop-zone puzzle-flask ${
                  reactionState.flask ? "correct" : ""
                } ${flashZone === "flask" ? "flash-effect" : ""}`}
              >
                {flaskItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    className="absolute top-0 left-0 w-full"
                  />
                ))}
              </div>
            </div>

            <div className="steps-box border border-black mt-5 p-4 rounded-xl bg-white">
              <h3 className="text-xl font-bold text-center mb-2">
                Experiment Steps
              </h3>
              <ol className="space-y-2">
                {experimentSteps.map((step, index) => {
                  const isFormula = step === "V = I R";
                  return (
                    <li
                      key={index}
                      className={`step-item ${
                        index === currentStepIndex ? "highlight" : ""
                      } ${
                        isFormula
                          ? "bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 text-center font-bold text-lg"
                          : "rounded-xl px-3 py-2"
                      }`}
                      onClick={() => setCurrentStepIndex(index)}
                    >
                      {!isFormula && (
                        <span className="font-semibold text-blue-600">
                          {index + 1}-{" "}
                        </span>
                      )}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatStepText(step),
                        }}
                      />
                    </li>
                  );
                })}
              </ol>

              {/* Sliders UI */}
            </div>
          </div>
          <div className=" p-4 bg-gray-50 border rounded-xl shadow max-w-sm ">
            <h4 className="font-thin text-center text-sm mb-">
              Adjust Voltage and Resistance
            </h4>
            <div className="mb-2">
              <label className="text-red-600 font-semibold">
                Voltage (V): {voltage} V
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="text-green-600 font-semibold">
                Resistance (R): {resistance} Ω
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>
            <div className="text-center text-blue-700 font-bold text-xl">
              Current (I) = {(voltage / resistance).toFixed(2)} A
            </div>
          </div>
        </div>

        <div className="control-buttons bottom-right mt-5 flex gap-3">
          <button className="bg-green-400 hover:bg-green-200 px-4 py-2 rounded">
            Back
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </div>
        <p className="text-gray-600 mt-4">
          Drag and drop items into device sections
        </p>
      </div>
    </div>
  );
}

export default Ohm;
