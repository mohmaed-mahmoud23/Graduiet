import { FormDataProvider } from "./context/FormDataContext"; // import جديد
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChemistryCategories from "./pages/ChemistryCategories";
import PhysicsCategories from "./pages/PhysicsCategories";
import Science from "./pages/Sciencee";
import ExperimentsPage from "./pages/ExperimentsPage";
import CreateChemistryExperiments from "./pages/CreateChemistryExperiments";
import CreatePhysicsExperiments from "./pages/CreatePhysicsExperiments";
import InformationOfChemical from "./pages/InformationOfChemical";
import ToolsOfChemical from "./pages/ToolsOfChemical";
import ChemicalOfChemistry from "./pages/ChemicalOfChemistry";
import Upload from "./pages/Upload";
import ChemistryFormula from "./pages/ChemistryFormula";
import Conclusion from "./pages/Conclusion";
import ToolsPhysical from "./InformatiomPAsics/Toolphysical";
import Materials from "./InformatiomPAsics/Materialofexperment";
import Formula from "./InformatiomPAsics/Formula";
import Stebes from "./InformatiomPAsics/Stebes";
import PotassiumNitrateExperiment from "./pages/PotassiumNitrateExperiment";
import Ohm from "./pages/Ohm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const AuthContext = React.createContext();

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <FormDataProvider>
        {" "}
        {/* غلفنا هنا */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/chemistryCategories"
              element={<ChemistryCategories />}
            />
            <Route path="/physicsCategories" element={<PhysicsCategories />} />
            <Route path="/science" element={<Science />} />
            <Route path="/experimentsPage" element={<ExperimentsPage />} />
            <Route
              path="/createChemistryExperiments"
              element={<CreateChemistryExperiments />}
            />
            <Route
              path="/createPhysicsExperiments"
              element={<CreatePhysicsExperiments />}
            />
            <Route path="/information" element={<InformationOfChemical />} />
            <Route path="/tools" element={<ToolsOfChemical />} />
            <Route path="/chemical" element={<ChemicalOfChemistry />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ChemistryFormula" element={<ChemistryFormula />} />
            <Route path="/conclusion" element={<Conclusion />} />
            <Route path="//Chemicals" element={<Materials />} />
            <Route path="/ToolsPhysical" element={<ToolsPhysical />} />
            <Route path="/Formula" element={<Formula />} />
            <Route path="/Conclusion" element={<Conclusion />} />
            <Route path="/Stebes" element={<Stebes />} />
            <Route path="/Ohm" element={<Ohm />} />
            <Route
              path="/PotassiumNitrateExperiment"
              element={<PotassiumNitrateExperiment />}
            />
            <Route
              path="/InformationOfChemical"
              element={<InformationOfChemical />}
            />
            {/* باقي الصفحات */}
          </Routes>
        </Router>
      </FormDataProvider>
    </AuthContext.Provider>
  );
}
export default App;
