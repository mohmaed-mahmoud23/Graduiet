import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableTool from "../pages/DraggableTool";
import "../pages/PotassiumNitrateExperiment.css";

const tools = [
  { name: "Stand", image: "" },
  { name: "Retort", image: "/ImageDrage/Group 974.png" },
  { name: "Glass bowl", image: "/ImageDrage/Group 975.png" },
  { name: "Bunsen burner", image: "/ImageDrage/Group 976.png" },
  { name: "Flask", image: "/ImageDrage/Group 977.png" },
  { name: "Ice", image: "/ImageDrage/Group 978.png" },
];

const chemicals = [
  { name: "KNO₃", image: "/ImageDrage/Group 898.png" },
  { name: "H₂SO₄", image: "/ImageDrage/Group 906.png" },
  { name: "HNO₃", image: "/ImageDrage/Group 907.png" },
];
const experimentSteps = [
  "Measure 50 g OF KNO₃ IN Test tube.",
  "Pour Test tube INTO Retort.",
  "Measure 30 g OF H₂SO₄ IN Test tube.",
  "Pour Ice INTO Retort.",
  "Pour Ice INTO Glass bowl.",
  "Insert Flask INTO Glass bowl.",
  "Insert the nozzle of the retort INTO Flask.",
  "Heat Retort BY Bunsen burner IN 100 c.",
];

function PotassiumNitrateExperiment() {
  const [flashZone, setFlashZone] = useState(null);
  const [mode, setMode] = useState("student");
  const [retortItems, setRetortItems] = useState([]);
  const [bowlItems, setBowlItems] = useState([]);
  const [flaskItems, setFlaskItems] = useState([]);

  const [reactionState, setReactionState] = useState({
    retort: false,
    ice: false,
    flask: false,
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const triggerFlash = (zone) => {
    setFlashZone(zone);
    setTimeout(() => setFlashZone(null), 600);
  };

  const handleDrop = (zone, item) => {
    triggerFlash(zone); // ✅ شغل التأثير في أي حالة

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
    return text
      .replace(
        /(Measure \d+ g OF \w+ IN Test tube)/gi,
        '<span class="green">$1</span>'
      )
      .replace(/(Pour \w+ INTO Retort)/gi, '<span class="blue">$1</span>')
      .replace(/(Pour Ice INTO Glass bowl)/gi, '<span class="green">$1</span>')
      .replace(
        /(Insert Flask INTO Glass bowl)/gi,
        '<span class="green">$1</span>'
      )
      .replace(
        /(Insert the nozzle of the retort INTO Flask)/gi,
        '<span class="orange">$1</span>'
      )
      .replace(
        /(Heat Retort BY Bunsen burner IN \d+ c)/gi,
        '<span class="red">$1</span>'
      );
  };

  return (
    <div className=" pl-12  experiment-layout">
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

        <div className=" mx-auto ">
          <h3 className="text-center text-2xl  text-black font-extrabold">
            Tools
          </h3>
          <div className="grid ">
            {tools.map((tool, index) => (
              <DraggableTool key={index} tool={tool} />
            ))}
          </div>
        </div>

        <div className=" ml-24">
          <h3 className="text-center text-2xl  text-black font-extrabold">
            Chemicals
          </h3>

          <div className=" flex gap-2">
            {chemicals.map((chem, index) => (
              <DraggableTool key={index} tool={chem} />
            ))}
          </div>
        </div>
      </div>

      <div className="center-panel" style={{ position: "relative" }}>
        <div className="device-box">
          <h2 className="device-title text-center font-bold">
            Potassium Nitrate Experiment
          </h2>
          <div className="device-content" style={{ position: "relative" }}>
            <div className="puzzle-layout" style={{ position: "relative" }}>
              <img
                src="/ImageDrage/Device.png"
                alt="experiment structure"
                className="puzzle-background"
                style={{ width: "100%", height: "auto" }}
              />
              <h1 className="whitespace-nowrap relative right-20">
                KNO₃ + H₂SO₄ → HNO₃ + K₂SO₄
              </h1>
              {/* Drop Zones */}
              <div
                ref={dropRetort}
                className={`drop-zone puzzle-retort ${
                  reactionState.retort ? "correct" : ""
                } ${flashZone === "retort" ? "flash-effect" : ""}`}
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "15%",
                  width: "20%",
                  height: "25%",
                }}
              >
                {retortItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80%",
                      position: "absolute",
                      top: "10%",
                      left: "10%",
                    }}
                  />
                ))}
              </div>
              <div
                ref={dropBowl}
                className={`drop-zone puzzle-bowl ${
                  reactionState.ice ? "correct" : ""
                } ${flashZone === "bowl" ? "flash-effect" : ""}`}
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "52%",
                  width: "20%",
                  height: "20%",
                }}
              >
                {bowlItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60%",
                      position: "absolute",
                      top: "20%",
                      left: "20%",
                    }}
                  />
                ))}
              </div>
              <div
                ref={dropFlask}
                className={`drop-zone puzzle-flask ${
                  reactionState.flask ? "correct" : ""
                } ${flashZone === "flask" ? "flash-effect" : ""}`}
                style={{
                  position: "absolute",
                  top: "53%",
                  left: "63%",
                  width: "10%",
                  height: "20%",
                }}
              >
                {flaskItems.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="steps-box border border-black"
              style={{ marginTop: "20px" }}
            >
              <h3>Experiment Steps</h3>
              <ol>
                {experimentSteps.map((step, index) => (
                  <li
                    key={index}
                    className={index === currentStepIndex ? "highlight" : ""}
                    onClick={() => setCurrentStepIndex(index)}
                  >
                    <span className="step-index">{index + 1}-</span>{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: formatStepText(step) }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="control-buttons bottom-right  ">
          <button className="back  p-14">Back</button>
          <button className="save">Save</button>
        </div>
        <p className="drag-text">Drag and drop items into device sections</p>
      </div>
    </div>
  );
}

export default PotassiumNitrateExperiment;
