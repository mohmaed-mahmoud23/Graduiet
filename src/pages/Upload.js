// src/pages/Upload.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [tools, setTools] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedTools =
      formData?.tools?.length > 0
        ? formData.tools
        : JSON.parse(localStorage.getItem("selectedTools")) || [];
    const savedChemicals =
      JSON.parse(localStorage.getItem("selectedChemicals")) || [];
    setTools(savedTools);
    setChemicals(savedChemicals);
  }, [formData]);

  const handleSave = () => {
    const fullFormData = { tools, chemicals, image: uploadedImage };
    localStorage.setItem("formData", JSON.stringify(fullFormData));
    setFormData(fullFormData);
    alert("✅ Form saved successfully!");
    navigate("/createChemistryExperiments");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Experiment</h2>

      {/* Body: centered container with space between panels */}
      <div className="flex w-full max-w-4xl gap-8">
        {/* Left panel (Tools + Chemicals) */}
        <div className="flex flex-col gap-6 w-1/3">
          {/* Tools box */}
          <div className="bg-white rounded-2xl shadow p-6 h-40 flex items-center justify-center">
            {tools.length === 0 ? (
              <span className="text-cyan-300 text-lg font-semibold">Tools</span>
            ) : (
              <ul className="flex gap-3">
                {tools.map((tool, idx) => (
                  <li key={idx} className="w-12 h-12">
                    <img
                      src={`/uploads/${tool.image}`}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Chemicals box */}
          <div className="bg-white rounded-2xl shadow p-6 h-40 flex items-center justify-center">
            {chemicals.length === 0 ? (
              <span className="text-cyan-300 text-lg font-semibold">
                Chemicals
              </span>
            ) : (
              <ul className="flex gap-3">
                {chemicals.map((chem) => (
                  <li key={chem.id} className="w-12 h-12">
                    <img
                      src={`/uploads/${chem.image}`}
                      alt={chem.name}
                      className="w-full h-full object-contain"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right panel (Upload Image) */}
        <div className="relative w-2/3 bg-cyan-50 rounded-2xl shadow-lg p-8 flex items-end justify-end">
          <label className="bg-white rounded-2xl shadow p-6  w-48 h-32 flex items-center justify-center cursor-pointer hover:border-cyan-300 transition">
            {!uploadedImage ? (
              <span className="text-gray-400 text-lg">Upload Image</span>
            ) : (
              <img
                src={uploadedImage}
                alt="Uploaded preview"
                className="max-h-full object-contain rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setUploadedImage(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-4 w-full max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-2xl shadow"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          disabled={!uploadedImage}
          className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-2xl shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
    </div>
  );
}
