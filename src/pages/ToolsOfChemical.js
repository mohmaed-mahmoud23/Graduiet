import React, { useState } from "react";
import "./Tools.css";

const tools = [
  { name: "Stand", image: "/images/create-experiments/Group 884.svg" },
  { name: "Flask", image: "/Group 883.svg" },
  { name: "Glass bowl", image: "/images/create-experiments/Group 886.svg" },
  { name: "Bunsen burner", image: "/images/burner.png" },
  { name: "Delivery tube", image: "/images/delivery.png" },
  { name: "Test Tube", image: "/images/test-tube.png" },
  { name: "Retort", image: "/images/retort.png" },
  { name: "Burette", image: "/images/burette.png" },
  { name: "Candle", image: "/images/candle.png" },
  { name: "Cork", image: "/images/cork.png" },
  { name: "Flask2", image: "/images/flask2.png" },
  { name: "Ice", image: "/images/ice.png" },
];

const ToolSelection = () => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [search, setSearch] = useState("");

  const handleSelect = (tool) => {
    const exists = selectedTools.some((t) => t.name === tool.name);
    if (!exists) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>Tools of Experiment</h1>
      <div className="tools-box">
        {/* Left side - tools list */}
        <div className="left-box">
          {/* Search Input Above Gallery */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="tool-gallery">
            {filteredTools.map((tool) => (
              <div
                className="tool-card"
                key={tool.name}
                onClick={() => handleSelect(tool)}
              >
                <img src={tool.image} alt={tool.name} className="tool-image" />
                <div className="tool-name">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - selected tools */}
        <div className="right-box">
          {selectedTools.length === 0 ? (
            <p>Select tools...</p>
          ) : (
            selectedTools.map((tool, i) => (
              <img
                key={i}
                src={tool.image}
                alt={tool.name}
                title={tool.name}
                className="selected-tool"
              />
            ))
          )}
        </div>
      </div>

      <div className="buttons-container">
        <button className="back-button">Back</button>
        <button className="save-button" onClick={() => alert("Saved ✅")}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ToolSelection;
