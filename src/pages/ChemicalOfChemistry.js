"use client";
import React, { useState, useRef, useEffect } from "react";
import "./Chemical.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormDataContext } from "../context/FormDataContext"; // تأكدي من المسار
const ChemicalOfChemistry = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [availableChemicals, setAvailableChemicals] = useState([]);
  const [selectedChemicals, setSelectedChemicals] = useState([]);
  const [chemicalName, setChemicalName] = useState("");
  const [chemicalDescription, setChemicalDescription] = useState("");
  const [chemicalColor, setChemicalColor] = useState("#ffffff");
  const [chemicalImage, setChemicalImage] = useState(null);
  const [chemicalImageFile, setChemicalImageFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedChemicalId, setHighlightedChemicalId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  const fetchChemicals = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/parameters");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAvailableChemicals(data);
    } catch (error) {
      console.error("Error fetching chemicals:", error);
    }
  };

  useEffect(() => {
    fetchChemicals();
  }, []);

  useEffect(() => {
    const fetchSelectedChemicals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/parameters');
        const data = await response.json();
        setSelectedChemicals(data);
      } catch (error) {
        console.error("Error fetching selected chemicals:", error);
      }
    };

    fetchSelectedChemicals();
  }, []);

  const addNewChemical = async () => {
    if (chemicalName.trim() && chemicalDescription.trim() && chemicalImageFile) {
      const formData = new FormData();
      formData.append("name", chemicalName);
      formData.append("description", chemicalDescription);
      formData.append("color", chemicalColor);
      formData.append("image", chemicalImageFile);

      try {
        const response = await fetch("/api/parameters", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const newChemical = await response.json();
          setAvailableChemicals((prev) => [...prev, newChemical]);
          setChemicalName("");
          setChemicalDescription("");
          setChemicalColor("#ffffff");
          setChemicalImage(null);
          setChemicalImageFile(null);
          setShowUploadModal(false);
        } else {
          console.error("Error adding new chemical:", await response.text());
        }
      } catch (error) {
        console.error("Error adding new chemical:", error);
      }
    }
  };

const saveSelectedChemicals = async () => {
  try {
    setFormData((prev) => ({
      ...prev,
     Chemical : selectedChemicals
    }));

    localStorage.setItem("SelectedChemicals", JSON.stringify(selectedChemicals ));

    // ✅ يرجّع المستخدم تاني لصفحة الدواير بعد الحفظ
    navigate("/Upload");
    alert("ا✅ Save successful");
  } catch (error) {
    console.error("Error in saveselectChemical :", error);
    alert("Error");
  }
};
 const selectChemical = (chemical) => {
  const alreadySelected = selectedChemicals.some(
    (c) => c._id === chemical._id
  );
  if (!alreadySelected) {
    setSelectedChemicals([...selectedChemicals, chemical]);
  }
};

  const handleDeleteChemical = async (chemical) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${chemical.name}"?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/parameters/${chemical.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setAvailableChemicals((prev) => prev.filter((c) => c.id !== chemical.id));
          setSelectedChemicals((prev) => prev.filter((c) => c.id !== chemical.id));
        } else {
          console.error("Failed to delete chemical:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting chemical:", error);
      }
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setNotFound(false);
    setHighlightedChemicalId(null);

    if (query.trim() === "") {
      fetchChemicals();
      return;
    }

    try {
      const response = await fetch(`/tools?search=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.length === 0) {
        setNotFound(true);
        return;
      }

      const foundChemical = data[0];
      const alreadyInAvailable = availableChemicals.some((chemical) => chemical.id === foundChemical.id);

      if (!alreadyInAvailable) {
        setAvailableChemicals((prev) => [...prev, foundChemical]);
      }

      setHighlightedChemicalId(foundChemical.id);
      setTimeout(() => setHighlightedChemicalId(null), 2000);
    } catch (error) {
      console.error("Error searching chemicals:", error);
    }
  };

  return (
    <div className="main-container">
      <h1>Chemicals of Experiment</h1>
     
      <br></br>
      <div className="tools-box">
        <div className="left-box">
          <div className="search-container">
            <button className="add-button" onClick={() => setShowUploadModal(true)}>
              ➕
            </button>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search chemical..."
                className="search-box"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="tools-list">
            {notFound ? (
              <p className="not-found">Not found this chemical</p>
            ) : (
              availableChemicals.map((chemical) => (
                <div
                  key={chemical.id}
                  className={`tool-wrapper ${highlightedChemicalId === chemical.id ? "highlighted" : ""}`}
                  onClick={() => selectChemical(chemical)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleDeleteChemical(chemical);
                  }}
                >
                  <img
                    src={`/uploads/${chemical.image}`}
                    className="tool-icon"
                    alt={chemical.name}
                  />
                  <div className="tooltip">
                    <strong>{chemical.name}</strong>
                    <p>{chemical.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="right-box">
          {selectedChemicals.length === 0 ? (
            <p>Select chemicals...</p>
          ) : (
        selectedChemicals.map((chemical) => {
  console.log(chemical);
  return (
    <img
      key={chemical._id}
      src={`http://localhost:4000/uploads/${chemical.image}`}
      className="tool-icon selected"
      alt={chemical.name}
      title={chemical.description}
      onClick={() => selectChemical(chemical)}
    />
  );
})

          )}
        </div>
      </div>
      <br></br>

      <div className="buttons-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="save-button" onClick={saveSelectedChemicals}>
          Save
        </button>
      </div>

      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={uploadRef}>
            <button className="close-button" onClick={() => setShowUploadModal(false)}>
              ✖
            </button>
            <h2>Add a New Chemical</h2>
            <input
              type="text"
              placeholder="Chemical Name"
              value={chemicalName}
              onChange={(e) => setChemicalName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={chemicalDescription}
              onChange={(e) => setChemicalDescription(e.target.value)}
            />
            <input
              type="color"
              value={chemicalColor}
              onChange={(e) => setChemicalColor(e.target.value)}
              title="Select Color"
            />
            {chemicalImage ? (
              <img src={chemicalImage} className="tool-preview" alt="Chemical Preview" />
            ) : (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setChemicalImage(URL.createObjectURL(file));
                      setChemicalImageFile(file);
                    }
                  }}
                  hidden
                />
                Upload Image
              </label>
            )}
            <button className="add-tool-button" onClick={addNewChemical}>
              Add Chemical
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemicalOfChemistry;
