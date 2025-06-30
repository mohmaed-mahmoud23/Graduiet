import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropZone from "../components/DropZone";
import DraggableTool from "../pages/DraggableTool";

const sectionsData = {
  thermal: {
    title: "Thermal Physics",
    experiments: [
      {
        name: "Calorimetry: Burning Stuff for Science!",
        image: "/images/experimentsPages/1s/1.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=55c13423da2cfe5be0bd9bdc&artifactID=2172020&conceptCollectionHandle=chemistry-::-calorimetry&collectionCreatorID=3&eId=SCI.CHE.811",
      },
      {
        name: "heating-and-cooling-curves",
        image: "/images/experimentsPages/1s/2.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=5666199b8e0e0862a697324f&artifactID=2317564&conceptCollectionHandle=chemistry-::-heating-and-cooling-curves&collectionCreatorID=3&eId=SCI.CHE.625",
      },
      {
        name: "Endothermic Reaction: Change in Temperature",
        image: "/images/experimentsPages/1s/3.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=5591c35d5aa413318141a83b&artifactID=2108343&conceptCollectionHandle=chemistry-::-endothermic-reaction&collectionCreatorID=3&eId=SCI.CHE.805",
      },
      {
        name: "Enthalpy: Chasing the Heat",
        image: "/images/experimentsPages/1s/4.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=53d139218e0e0850d229dc58&artifactID=1817918&conceptCollectionHandle=chemistry-::-enthalpy&collectionCreatorID=3&eId=SCI.CHE.810",
      },
    ],
  },
  electrical: {
    title: "Electrical Physics",
    experiments: [
      {
        name: "ohms-law",
        url: "/Ohm",
        image: "/images/WhatsApp Image 2025-06-30 at 12.31.18 AM (1).jpeg",
        type: "internal",
      },
      {
        name: "battery-resistor-circuit",
        image: "/images/experimentsPages/2nd/2.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/battery-resistor-circuit/latest/battery-resistor-circuit.html?simulation=battery-resistor-circuit",
      },
      {
        name: "signal-circuit",
        image: "/images/experimentsPages/2nd/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/signal-circuit/latest/signal-circuit.html?simulation=signal-circuit",
      },
      {
        name: "capacitor-lab",
        image: "/images/experimentsPages/2nd/4.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/capacitor-lab/latest/capacitor-lab.html?simulation=capacitor-lab",
      },
    ],
  },
  mechanical: {
    title: "Mechanical Physics",
    experiments: [
      {
        name: "Experiment 1",
        image: "/images/experimentsPages/3d/1.png",
        type: "internal",
        url: "https://example.com/exp1",
      },
      {
        name: "projectile-motion",
        image: "/images/experimentsPages/3d/2.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
      },
      {
        name: "motion-mapper",
        image: "/images/experimentsPages/3d/3.png",
        type: "external",
        url: "https://universeandmore.com/motion-mapper/labXchangeVersion.html",
      },
      {
        name: "ladybug-revolution",
        image: "/images/experimentsPages/3d/4.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation",
      },
    ],
  },
  modern: {
    title: "Modern physics",
    experiments: [
      {
        name: "optical-quantum-control",
        image: "/images/experimentsPages/4th/1.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/optical-quantum-control/latest/optical-quantum-control.html?simulation=optical-quantum-control",
      },
      {
        name: "photoelectric",
        image: "/images/experimentsPages/4th/2.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/photoelectric/latest/photoelectric.html?simulation=photoelectric",
      },
      {
        name: "bending-light",
        image: "/images/experimentsPages/4th/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_en.html",
      },

      {
        name: "discharge-lamps",
        image: "/images/experimentsPages/4th/4.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/cheerpj/discharge-lamps/latest/discharge-lamps.html?simulation=discharge-lamps",
      },
    ],
  },
  analytical: {
    title: "Analytical Chemistry",
    experiments: [
      {
        name: "Econcentration",
        image: "images/WhatsApp Image 2025-06-28 at 10.40.45 PM (1).jpeg",
        type: "internal",
        url: "/PotassiumNitrateExperiment",
      },
      {
        name: "Beers Law Lab",
        image: "/images/experimentsPages/1sc/2.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_all.html",
      },
      {
        name: "acid-base-solutions",
        image: "/images/experimentsPages/1sc/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_all.html",
      },
      {
        name: "molarity",
        image: "/images/experimentsPages/1sc/4.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/molarity/latest/molarity_en.html",
      },
    ],
  },
  physical: {
    title: "Physical Chemistry",
    experiments: [
      {
        name: "states-of-matter",
        image: "/images/experimentsPages/2ndc/1.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_en.html",
      },
      {
        name: "molecule-shapes",
        image: "/images/experimentsPages/2ndc/2.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/molecule-shapes-basics/latest/molecule-shapes-basics_all.html",
      },
      {
        name: "molecules-and-light",
        image: "/images/experimentsPages/2ndc/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_all.html",
      },
      {
        name: "Structure of Water: Phases of Matter",
        image: "/images/experimentsPages/2ndc/4.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=53f643c85aa4131baf0775b7&artifactID=1828426&conceptCollectionHandle=chemistry-::-structure-of-water&collectionCreatorID=3&eId=SCI.CHE.702",
      },
    ],
  },
  organic: {
    title: "Organic  Chemistry",
    experiments: [
      {
        name: "Purifying Protein by Column Chromatography",
        image: "/images/experimentsPages/3dc/1.png",
        type: "external",
        url: "https://www.labxchange.org/library/items/lb:LabXchange:1b8be051:lx_simulation:1?%3Ffullscreen=true&fullscreen=true",
      },
      {
        name: "micelles",
        image: "/images/experimentsPages/3dc/2.png",
        type: "external",
        url: "https://lab.concord.org/embeddable.html#interactives/interactions/micelles.json",
      },
      {
        name: "Build a Molecule",
        image: "/images/experimentsPages/3dc/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_en.html",
      },
      {
        name: "Making and Breaking Bonds: The Effect of Temperature",
        type: "external",
        image: "/images/experimentsPages/3dc/4.png",
        url: "https://lab.concord.org/embeddable.html#interactives/interactions/dissocation-energy-2.json",
      },
    ],
  },
  "non-organic": {
    title: "Non-organic Chemistry",
    experiments: [
      {
        name: "Experiment 1",
        image: "/images/experimentsPages/4thc/1.png",
        type: "internal",
        url: "https://example.com/exp1",
      },
      {
        name: "Dissociation: Solid on Land, Ion in Water",
        image: "/images/experimentsPages/4thc/2.png",
        type: "external",
        url: "https://www.ck12.org/assessment/tools/geometry-tool/fullscreen.embed.html?questionId=55ba8b445aa4130ba5a2a63d&artifactID=2158462&conceptCollectionHandle=chemistry-::-dissociation&collectionCreatorID=3&eId=SCI.CHE.710",
      },
      {
        name: "build-an-atom",
        image: "/images/experimentsPages/4thc/3.png",
        type: "external",
        url: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html",
      },
      {
        name: "Atom and Ion Builder (With Table)",
        image: "/images/experimentsPages/4thc/4.png",
        type: "external",
        url: "https://lab.concord.org/embeddable.html#interactives/interactions/atom-builder-with-table.json",
      },
    ],
  },
  // كمّلي باقي الأقسام هنا
};

const titleColors = [
  "#2196F3",
  "#FF6900",
  "#FFea00",
  "#FF6900",
  "#FFea00",
  "#008b02",
  "#ba68c8",
  "#653294",
  "#0a9610",
  "#8bc34a",
];

const ExperimentsPage = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sectionParam = new URLSearchParams(location.search).get("section");
  const section = sectionsData[sectionParam];

  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!section) {
    return <div style={{ padding: "20px" }}>Section not found</div>;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", padding: "10px 20px" }}>
        {/* الصف العلوي */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {/* سهم الرجوع - استبدلي span بأي أيقونة */}
          <span
            className="icon-back"
            onClick={() => navigate(-1)}
            style={{ fontSize: "24px", cursor: "pointer", marginRight: "10px" }}
          >
            <img
              alt=""
              style={{ width: "65px" }}
              src="/images/back-arrow.svg"
            />
          </span>

          {/* اسم القسم بحروف ملوّنة */}
          <h2
            style={{
              flexGrow: 1,
              textAlign: "center",
              margin: 0,
              fontSize: "42px",
              fontFamily: "segeo",
            }}
          >
            {section.title.split("").map((char, index) => (
              <span
                key={index}
                style={{ color: titleColors[index % titleColors.length] }}
              >
                {char}
              </span>
            ))}
          </h2>

          {/* علامة + للمدرس فقط */}
          {role && role.toLowerCase() === "teacher" && (
            <span
              className="icon-plus"
              style={{
                fontSize: "24px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => {
                const physicsSections = [
                  "modern",
                  "electrical",
                  "mechanical",
                  "thermal",
                ]; // حط هنا أسماء الـsection للفيزياء
                const chemistrySections = [
                  "organic",
                  "non-organic",
                  "physical",
                  "analytical",
                ];

                if (physicsSections.includes(sectionParam)) {
                  navigate("/createPhysicsExperiments");
                } else if (chemistrySections.includes(sectionParam)) {
                  navigate("/createChemistryExperiments");
                } else {
                  alert("غير معروف نوع القسم"); // fallback لو القسم مش معروف
                }
              }}
            >
              <img
                alt=""
                style={{ width: "65px" }}
                src="images/plus-icon.png"
              />
            </span>
          )}
        </div>

        {/* بطاقات التجارب */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          {section.experiments.map((exp, index) => (
            <div
              key={index}
              style={{
                width: "250px",
                margin: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {exp.type === "external" && (
                <div
                  style={{
                    width: "250px",
                    height: "250px",
                    background: "#f9f9f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "35px",
                  }}
                >
                  <img
                    src={exp.image}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}
              {/* في حالة كان Internal فقط، اضف الأيقونات */}
              {exp.type === "internal" && (
                <div style={{ position: "relative" }}>
                  <img
                    src={exp.image}
                    alt=""
                    style={{
                      borderRadius: "35px",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                  {role?.toLowerCase() === "teacher" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "5px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px", // المسافة بين الأيقونات
                      }}
                    >
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor: "none",
                          borderRadius: "50%",

                          cursor: "pointer",
                        }}
                        onClick={() => console.log("Edit clicked!")}
                      >
                        <img
                          alt=""
                          src="/images/experimentsPages/edit.png"
                          style={{ width: "40px", height: "40px" }}
                        />
                      </div>
                      <div
                        style={{
                          backgroundColor: "none",
                          padding: "10px",
                          borderRadius: "50%",

                          cursor: "pointer",
                        }}
                        onClick={() => console.log("Delete clicked!")}
                      >
                        <img
                          alt=""
                          src="/images/experimentsPages/delete.png"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </div>
                      <div
                        style={{
                          backgroundColor: "none",
                          padding: "10px",
                          borderRadius: "50%",

                          cursor: "pointer",
                        }}
                        onClick={() => console.log("Share clicked!")}
                      >
                        <img
                          alt=""
                          src="/images/experimentsPages/share.png"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </div>
                      {/* أيقونة السميوليشن في أعلى اليمين (موجودة لجميع التجارب) */}
                      {/* <div style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "white", padding: "10px", borderRadius: "50%", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer" }} onClick={() => console.log("Simulation clicked!")}>
        
      </div> */}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                <button
                  style={{
                    fontSize: "15px",
                    marginTop: "15px",
                    padding: "15px 45px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    background: "#87ceeb",
                    color: "#000",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, font-weight 0s", // التأثير على التكبير فقط
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"; // تكبير الزر
                    e.currentTarget.style.fontWeight = "bold"; // جعل الخط بولد
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)"; // عودة الحجم الطبيعي
                    e.currentTarget.style.fontWeight = "normal"; // العودة للخط الطبيعي
                  }}
                >
                  Info
                </button>
                <button
                  onClick={() => setSelectedUrl(exp.url)}
                  style={{
                    fontSize: "15px",
                    marginTop: "15px",
                    padding: "15px 45px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    background: "#ffd800",
                    color: "#000",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, font-weight 0s", // التأثير على التكبير فقط
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"; // تكبير الزر
                    e.currentTarget.style.fontWeight = "bold"; // جعل الخط بولد
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)"; // عودة الحجم الطبيعي
                    e.currentTarget.style.fontWeight = "normal"; // العودة للخط الطبيعي
                  }}
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* iframe للتجربة */}
        {selectedUrl && (
          <div
            style={{
              position: "fixed",

              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setSelectedUrl(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px 15px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(206, 8, 8, 0.8)",
                // color: '#fff',
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              <img alt="" src="/images/experimentsPages/x.png" />
            </button>
            <iframe
              src={selectedUrl}
              title="Experiment"
              style={{
                width: "90%",
                height: "90%",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default ExperimentsPage;
