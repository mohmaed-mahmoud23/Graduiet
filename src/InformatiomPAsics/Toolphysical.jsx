"use client";
import React, { useState, useRef, useEffect } from "react";
import "../pages/Tools.css";
import { useNavigate } from "react-router-dom";

const ToolsPhysical = ({ formData, setFormData }) => {
  const [availableTools, setAvailableTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolName, setToolName] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [toolCategory, setToolCategory] = useState("");
  const [toolImage, setToolImage] = useState(null);
  const [toolImageFile, setToolImageFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedToolId, setHighlightedToolId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAvailableTools(data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    const fetchSelectedTools = async () => {
      try {
        const response = await fetch("/tools");
        const data = await response.json();
        setSelectedTools(data);
      } catch (error) {
        console.error("Error fetching selected tools:", error);
      }
    };

    fetchSelectedTools();
  }, []);

  const addNewTool = async () => {
    if (toolName.trim() && toolDescription.trim() && toolImage) {
      try {
        const response = await fetch("/api/tools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: toolName,
            description: toolDescription,
            category: toolCategory,
            image: toolImage,
          }),
        });

        if (response.ok) {
          const newTool = await response.json();
          setAvailableTools((prevTools) => [...prevTools, newTool]);
          setToolName("");
          setToolDescription("");
          setToolCategory("");
          setToolImage(null);
          setShowUploadModal(false);
        } else {
          console.error("Error adding new tool:", await response.text());
        }
      } catch (error) {
        console.error("Error adding new tool:", error);
      }
    }
  };

  const saveSelectedTools = async () => {
    try {
      setFormData((prev) => ({
        ...prev,
        tools: selectedTools,
      }));

      localStorage.setItem("selectedTools", JSON.stringify(selectedTools));
      alert("✅ تم الحفظ بنجاح");
    } catch (error) {
      console.error("Error in saveSelectedTools:", error);
      alert("Error");
    }
  };

  const handleSave = () => {
    const experimentData = {
      experimentName: formData.experimentName || "",
      description: formData.description || "",
      objective: formData.objective || "",
    };

    setFormData({ ...formData, experiment: experimentData });
    console.log("Saved experiment:", experimentData);
    alert("✅ تم الحفظ بنجاح");
    navigate("/createChemistryExperiments");
  };

  const selectTool = (tool) => {
    const toolId = tool._id || tool.id;
    const isAlreadySelected = selectedTools.some(
      (t) => (t._id || t.id) === toolId
    );

    if (isAlreadySelected) {
      setSelectedTools((prev) =>
        prev.filter((t) => (t._id || t.id) !== toolId)
      );
    } else {
      setSelectedTools((prev) => [...prev, tool]);
    }
  };

  const handleDeleteTool = async (tool) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${tool.name}"?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/tools/${tool._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setAvailableTools((prev) =>
            prev.filter((t) => (t._id || t.id) !== tool._id)
          );
          setSelectedTools((prev) =>
            prev.filter((t) => (t._id || t.id) !== tool._id)
          );
        } else {
          console.error("Failed to delete tool:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setNotFound(false);
    setHighlightedToolId(null);

    if (query.trim() === "") {
      fetchTools();
      return;
    }

    try {
      const response = await fetch(
        `/tools?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setNotFound(true);
        return;
      }

      const foundTool = data[0];
      const alreadyInAvailable = availableTools.some(
        (tool) => tool.id === foundTool.id
      );

      if (!alreadyInAvailable) {
        setAvailableTools((prev) => [...prev, foundTool]);
      }

      setHighlightedToolId(foundTool.id);
      setTimeout(() => setHighlightedToolId(null), 2000);
    } catch (error) {
      console.error("Error searching tools:", error);
    }
  };

  return (
    <div className="main-container">
      <h1>Tools of Experiment</h1>
      <br />
      <div className="tools-box">
        <div className="left-box">
          <div className="search-container">
            <button
              className="add-button"
              onClick={() => setShowUploadModal(true)}
            >
              ➕
            </button>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search tool..."
                className="search-box"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="tools-list">
            {notFound ? (
              <p className="not-found">Not found this tool</p>
            ) : (
              availableTools
                .filter((tool) => tool.category === "Physics")
                .map((tool) => (
                  <div
                    key={tool._id}
                    className={`tool-wrapper ${
                      highlightedToolId === tool._id ? "highlighted" : ""
                    }`}
                    onClick={() => selectTool(tool)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleDeleteTool(tool);
                    }}
                  >
                    <img
                      src={`/uploads/${tool.image || ""}`}
                      className="tool-icon"
                      alt={""}
                      title={tool.description}
                    />
                    <div className="tool-name">{tool.name}</div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="right-box">
          {selectedTools.length === 0 ? (
            <p>Select tools...</p>
          ) : (
            selectedTools.map((tool, index) => (
              <img
                key={index}
                src={`/uploads/${tool.image}`}
                className="tool-icon"
                alt={tool.name}
                title={tool.description}
                onClick={() => selectTool(tool)}
              />
            ))
          )}
        </div>
      </div>
      <br />

      <div className="buttons-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="save-button" onClick={saveSelectedTools}>
          Save
        </button>
        <button className="save-button" onClick={handleSave}>
          Save & Continue
        </button>
      </div>

      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={uploadRef}>
            <button
              className="close-button"
              onClick={() => setShowUploadModal(false)}
            >
              ✖
            </button>
            <h2>Add a New Tool</h2>
            <input
              type="text"
              placeholder="Tool Name"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={toolDescription}
              onChange={(e) => setToolDescription(e.target.value)}
            />
            <select
              value={toolCategory}
              onChange={(e) => setToolCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
            {toolImage ? (
              <img
                src={toolImage}
                className="tool-preview"
                alt="Tool Preview"
              />
            ) : (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setToolImage(URL.createObjectURL(file));
                      setToolImageFile(file);
                    }
                  }}
                  hidden
                />
                Upload Image
              </label>
            )}
            <button className="add-tool-button" onClick={addNewTool}>
              Add Tool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsPhysical;
