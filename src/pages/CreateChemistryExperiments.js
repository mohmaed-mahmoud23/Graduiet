import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExperimentDiagram.css'; // ملف CSS للتنسيق

function CreateChemistryExperiments() {

  const navigate = useNavigate();
  return (

    <>
      {/* سهم الرجوع - استبدلي span بأي أيقونة */}
    <span  style={{ display: 'flex', alignItems: 'center', marginTop: '14px' ,fontSize: '24px', cursor: 'pointer', marginLeft: '20px' }}
    className="icon-back"
    onClick={() => navigate(-1)}
  >
   <img alt ="" style ={{width:'65px'}}src='/images/back-arrow.svg'/>
  </span>

    <div className="experiment-diagram"  style={{marginTop:'-50px'}}>
    <div className="center-circle">Experiment</div>

<div className="item information" onClick={() => navigate("/information")}>
  <div className="label">Information</div>
  <img src={'/images/create-experiments/Group 884.svg'} alt="Information" className="icon" />
</div>

<div className="item tools" onClick={() => navigate("/tools")}>
  <div className="label">Tools</div>
  <img src={'/images/create-experiments/Group 883.svg'} alt="Tools" className="icon" />
</div>

    <div className="item chemicals"onClick={() => navigate("/chemical")}>
    <div className="label">Chemicals</div>
      <img src={'/images/create-experiments/Group 885.svg'} alt="Chemicals" className="icon" />
    </div>

    <div className="item equation" onClick={() => navigate("/formula")}>
      <img src={'/images/create-experiments/Group 965.svg'} alt="Equation" className="icon" />
      <div className="label">Equation</div>
    </div>

    <div className="item steps">
      <img src={'/images/create-experiments/Group 966.svg'} alt="Steps" className="icon" />
      <div className="label">Steps</div>
    </div>

    <div className="item conclusion" onClick={() => navigate("/conclusion")}>
      <img src={'/images/create-experiments/Group 886.svg'} alt="Conclusion" className="icon" />
      <div className="label">Conclusion</div>
    </div>

    <div className="arrow information-arrow">
      <img src={'/images/create-experiments/NoPath - Copy (10).png'} width={120} height={120} alt="Arrow" />
    </div>

    <div className="arrow tools-arrow">
      <img src={'/images/create-experiments/NoPath - Copy (10).png'} width={125} height={125} alt="Arrow" />
    </div>

    <div className="arrow chemicals-arrow">
      <img src={'/images/create-experiments/NoPath - Copy (10).png'} width={110} height={110} alt="Arrow" />
    </div>

    <div className="arrow equation-arrow">
      <img src={'/images/create-experiments/NoPath - Copy (10).png'} width={120} height={120} alt="Arrow" />
    </div>

    <div className="arrow steps-arrow">
      <img src={'/images/create-experiments/NoPath - Copy (10).png'} width={120} height={120} alt="Arrow" />
    </div>

    </div>
</>
  );
}

export default CreateChemistryExperiments;