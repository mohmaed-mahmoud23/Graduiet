import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {  
  const navigate = useNavigate();
  const [errorMessage, setError] = useState("");

  const handleLogin = () => {
    sessionStorage.removeItem("loggedOut");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    setError("No account found. Please sign up first.");
    return;
  }

  const foundUser = users.find(user => user.email === email && user.password === password);
  if (!foundUser) {
    setError("Invalid email or password.");
    return;
  }

  sessionStorage.setItem("user", JSON.stringify(foundUser));
sessionStorage.setItem("activeRole", foundUser.role);
localStorage.setItem("role", foundUser.role); 
localStorage.setItem("user", JSON.stringify(foundUser)); // ✅ تأكيد تخزين المستخدم
// ✅ مهم
  setError("");
  navigate("/");
};
  return (    
    <div className="container2">    
      <img        
        src="/images/login/cartoon-character.png"        
        alt="Cartoon Character"        
        style={{ marginRight: "50px" }}        
        width={300}        
        height={300}      
      />      
      
      <div className="form">        
        <h2 className="title">Email</h2>        
        <input type="email" id="email" placeholder="Enter Your Email" className="input" />  
        
        <h2 className="title">Password</h2>        
        <input type="password" id="password" placeholder="Enter Your Password" className="input" /> 

        {/* ✅ عرض رسالة الخطأ تحت حقل الإدخال وليس في alert */}
        {errorMessage && <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>}

        <button className="button" onClick={handleLogin}>Login</button>    
        <p className="login-text">
      Don't have an account?{" "}
      <a onClick={() => navigate("/SignUp")}>Sign Up</a>
    </p>
      </div>  
    </div>  
  );
}

export default Login;