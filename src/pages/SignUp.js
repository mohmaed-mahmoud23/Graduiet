import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // حفظ اختيار الدور
  const [errors, setErrors] = useState({});

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setErrors((prev) => ({ ...prev, role: "" })); // إزالة رسالة الخطأ عند اختيار الدور
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!role) {
      newErrors.role = "Please select either Teacher or Student";
    }

    // إذا كان هناك أخطاء، لا تكمل العملية
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
const existingUser = JSON.parse(localStorage.getItem("user"));
if (existingUser && existingUser.email === email) {
  newErrors.email = "An account with this email already exists";
  setErrors(newErrors);
  return;
}
    // ✅ تخزين البيانات في localStorage
    // ✅ تخزين البيانات في localStorage
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const emailExists = existingUsers.some(user => user.email === email);

if (emailExists) {
  setErrors({ email: "This email is already registered" });
  return;
}

const newUser = { firstName, email, password, role };
const updatedUsers = [...existingUsers, newUser];
localStorage.setItem("users", JSON.stringify(updatedUsers));
localStorage.setItem("role", role);
localStorage.setItem("user", JSON.stringify(newUser)); // ✅
sessionStorage.removeItem("loggedOut"); // ✅

navigate("/login");
  };

  // const [errors, setErrors] = useState({});

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">User Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter Your Name" />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter Your Email" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Your Password" />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* ✅ اختيار الدور مع إبراز الاختيار عند الضغط عليه */}
          <div className="user-section">
            <div
              className={`user-type ${role === "Teacher" ? "selected" : ""}`}
              onClick={() => handleRoleSelect("Teacher")}
            >
              <img src="/images/signUp/teacher.png" className="user-image" alt="Teacher" />
              <span>Teacher</span>
            </div>
            <div
              className={`user-type ${role === "Student" ? "selected" : ""}`}
              onClick={() => handleRoleSelect("Student")}
            >
              <img src="/images/signUp/student.png" className="user-image" alt="Student" />
              <span>Student</span>
            </div>
          </div>

          {errors.role && <span className="error">{errors.role}</span>}

          <button type="submit" className="button">Sign Up</button>
          <p className="signin-text">
  Already have an account?{" "}
  <a onClick={() => navigate("/Login")} > Log In</a>
</p>
        </form>
      </div>

      {/* ✅ صورة Science */}
      <div className="science-layout">
        <div className="main-image-container">
          <img src="images/signUp/scinece.jpg" alt="Science" className="main-image" width={300} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;