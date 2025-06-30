"use client";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../InformatiomPAsics/material.css";

const Materials = ({ formData, setFormData }) => {
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [materialUnit, setMaterialUnit] = useState("");
  const [materialSymbol, setMaterialSymbol] = useState("");
  const [materialCategory, setMaterialCategory] = useState("");
  const [materialProperties, setMaterialProperties] = useState({
    atomicStructure: "",
    color: "",
    smell: "",
    state: "",
  });
  const [materialImage, setMaterialImage] = useState(null);
  const [materialImageFile, setMaterialImageFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedMaterialId, setHighlightedMaterialId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/parameters");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAvailableMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    const fetchSelectedMaterials = async () => {
      try {
        const response = await fetch("/parameters");
        const data = await response.json();
        setSelectedMaterials(data);
      } catch (error) {
        console.error("Error fetching selected materials:", error);
      }
    };
    fetchSelectedMaterials();
  }, []);

  const addNewMaterial = async () => {
    if (
      materialName.trim() &&
      materialUnit.trim() &&
      materialSymbol.trim() &&
      materialCategory.trim() &&
      materialImage
    ) {
      const filteredProperties = Object.fromEntries(
        Object.entries(materialProperties).filter(
          ([_, value]) => value.trim() !== ""
        )
      );

      const materialData = {
        name: materialName,
        unit: materialUnit,
        symbol: materialSymbol,
        category: materialCategory,
        image: materialImage,
        properties: filteredProperties,
      };

      try {
        const response = await fetch("/api/parameters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(materialData),
        });

        if (response.ok) {
          const newMaterial = await response.json();
          setAvailableMaterials((prev) => [...prev, newMaterial]);
          setMaterialName("");
          setMaterialUnit("");
          setMaterialSymbol("");
          setMaterialCategory("");
          setMaterialProperties({
            atomicStructure: "",
            color: "",
            smell: "",
            state: "",
          });
          setMaterialImage(null);
          setMaterialImageFile(null);
          setShowUploadModal(false);
        } else {
          console.error("Error adding new material:", await response.text());
        }
      } catch (error) {
        console.error("Error adding new material:", error);
      }
    }
  };

  const saveSelectedMaterials = async () => {
    try {
      setFormData((prev) => ({
        ...prev,
        Materials: selectedMaterials,
      }));

      localStorage.setItem(
        "selectedMaterials",
        JSON.stringify(selectedMaterials)
      );

      alert("✅ Save successful");

      // ✅ التنقل للـ upload بعد الحفظ
      navigate("/upload");
    } catch (error) {
      console.error("Error in selectedMaterials:", error);
      alert("Error");
    }
  };

  const selectMaterial = (material) => {
    const materialId = material._id || material.id;
    const isAlreadySelected = selectedMaterials.some(
      (c) => (c._id || c.id) === materialId
    );

    if (isAlreadySelected) {
      setSelectedMaterials((prev) =>
        prev.filter((c) => (c._id || c.id) !== materialId)
      );
    } else {
      setSelectedMaterials((prev) => [...prev, material]);
    }
  };

  const handleDeleteMaterial = async (material) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${material.name}"?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/parameters/${material._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setAvailableMaterials((prev) =>
            prev.filter((c) => (c._id || c.id) !== material._id)
          );
          setSelectedMaterials((prev) =>
            prev.filter((c) => (c._id || c.id) !== material._id)
          );
        } else {
          console.error("Failed to delete material:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting material:", error);
      }
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setNotFound(false);
    setHighlightedMaterialId(null);

    if (query.trim() === "") {
      fetchMaterials();
      return;
    }

    try {
      const response = await fetch(
        `/materials?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setNotFound(true);
        return;
      }

      const foundMaterial = data[0];
      const alreadyInAvailable = availableMaterials.some(
        (material) => material.id === foundMaterial.id
      );

      if (!alreadyInAvailable) {
        setAvailableMaterials((prev) => [...prev, foundMaterial]);
      }

      setHighlightedMaterialId(foundMaterial.id);
      setTimeout(() => setHighlightedMaterialId(null), 2000);
    } catch (error) {
      console.error("Error searching materials:", error);
    }
  };

  return (
    <div className="main-container">
      <h1>Materials of Experiment</h1>
      <br />
      <div className="tools-box">
        <div className="left-box">
          <div className="search-container">
            <button
              className="add-button"
              onClick={() => {
                setShowUploadModal(true);
                setTimeout(() => {
                  uploadRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              ➕
            </button>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search material..."
                className="search-box"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="tools-list">
            {notFound ? (
              <p className="not-found">Not found this material</p>
            ) : (
              availableMaterials
                .filter((material) => material.category === "Physics")
                .map((material) => (
                  <div
                    key={material._id}
                    className={`material-wrapper ${
                      highlightedMaterialId === material._id
                        ? "highlighted"
                        : ""
                    }`}
                    onClick={() => selectMaterial(material)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleDeleteMaterial(material);
                    }}
                  >
                    <img
                      src={`/uploads/${material.image || ""}`}
                      className="tool-icon"
                      alt=""
                      title={
                        material.properties
                          ? Object.entries(material.properties)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join("\n")
                          : "No properties"
                      }
                    />
                    <div className="material-name">{material.name}</div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="right-box">
          {selectedMaterials.length === 0 ? (
            <p>Select materials...</p>
          ) : (
            selectedMaterials.map((material, index) => (
              <React.Fragment key={index}>
                <img
                  src={`/uploads/${material.image || ""}`}
                  className="tool-icon"
                  alt=""
                  title={material.name}
                  onClick={() => selectMaterial(material)}
                />
                <div className="material-name">{material.name}</div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      <br />
      <div className="buttons-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="save-button" onClick={saveSelectedMaterials}>
          Save
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
            <h2>Add a New Material</h2>
            <input
              type="text"
              placeholder="Material Name"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Unit"
              value={materialUnit}
              onChange={(e) => setMaterialUnit(e.target.value)}
            />
            <input
              type="text"
              placeholder="Symbol"
              value={materialSymbol}
              onChange={(e) => setMaterialSymbol(e.target.value)}
            />
            <select
              value={materialCategory}
              onChange={(e) => setMaterialCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
            <p>Properties</p>
            {Object.entries(materialProperties).map(([key, value]) => (
              <div key={key}>
                <input
                  type="text"
                  placeholder={key}
                  value={value}
                  onChange={(e) =>
                    setMaterialProperties((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}

            {materialImage ? (
              <img
                src={materialImage}
                className="Material-preview"
                alt="Material Preview"
              />
            ) : (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setMaterialImage(URL.createObjectURL(file));
                      setMaterialImageFile(file);
                    }
                  }}
                  hidden
                />
                Upload Image
              </label>
            )}

            <button className="add-material-button" onClick={addNewMaterial}>
              Add Material
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
