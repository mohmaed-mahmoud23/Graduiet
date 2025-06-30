import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CAMIstry.css";
function CreatePhysicsExperiments() {
  const navigate = useNavigate();

  return (
    <>
      {/* زر الرجوع */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "14px",
          fontSize: "24px",
          cursor: "pointer",
          marginLeft: "20px",
        }}
        className="icon-back"
        onClick={() => navigate(-1)}
      >
        <img alt="" style={{ width: "65px" }} src="/images/back-arrow.svg" />
      </span>

      <div className="experiment-diagram" style={{ marginTop: "-50px" }}>
        <div className="center-circle">Experiment</div>

        <div
          className="item information"
          onClick={() => navigate("/information")}
        >
          <div className="label">Information</div>
          <img
            src="/images/create-experiments/Group 884.svg"
            alt="Information"
            className="icon"
          />
        </div>

        <div className="item tools" onClick={() => navigate("/tools")}>
          <div className="label">Tools</div>
          <img
            src="/images/create-experiments/Group 885.svg"
            alt="Tools"
            className="icon"
          />
        </div>

        <div className="item chemicals" onClick={() => navigate("/chemical")}>
          <div className="label">Materials</div>
          <img
            src="/WhatsApp Image 2025-06-29 at 7.32.33 PM.jpeg"
            alt="Chemicals"
            className="icon"
          />
        </div>

        <div className="item equation" onClick={() => navigate("/formula")}>
          <img
            src="/images/create-experiments/Group 965.svg"
            alt="Equation"
            className="icon"
          />
          <div className="label">Equation</div>
        </div>

        <div className="itemsteps">
          <img
            src="/WhatsApp Image 2025-06-29 at 7.33.52 PM.jpeg"
            alt="Steps"
            className="icon"
          />
          <div className="label">
            <Link to="/Stebes">Steps</Link>
          </div>
        </div>

        <div
          className="item conclusion"
          onClick={() => navigate("/conclusion")}
        >
          <img
            src="/images/create-experiments/Group 886.svg"
            alt="Conclusion"
            className="icon"
          />
          <div className="label">Conclusion</div>
        </div>

        {/* Arrows */}
        <div className="arrow information-arrow">
          <img
            src="/images/create-experiments/NoPath - Copy (10).png"
            width={120}
            height={120}
            alt="Arrow"
          />
        </div>
        <div className="arrow tools-arrow">
          <img
            className="w-44[300px]"
            src="/images/create-experiments/NoPath - Copy (10).png"
            width={200}
            height={300}
            alt="Arrow"
          />
        </div>
        <div className="arrow chemicals-arrow">
          <img
            src="/images/create-experiments/NoPath - Copy (10).png"
            width={110}
            height={110}
            alt="Arrow"
          />
        </div>
        <div className="arrow equation-arrow">
          <img
            src="/images/create-experiments/NoPath - Copy (10).png"
            width={120}
            height={120}
            alt="Arrow"
          />
        </div>
        <div className="arrow steps-arrow">
          <img
            src="/images/create-experiments/NoPath - Copy (10).png"
            width={120}
            height={120}
            alt="Arrow"
          />
        </div>
      </div>
    </>
  );
}

export default CreatePhysicsExperiments;
