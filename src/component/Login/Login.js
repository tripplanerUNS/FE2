import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { MdEmail } from "react-icons/md";

function Login() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("user");
  const [credentials, setCredentials] = useState({
    email: "", // State untuk menyimpan email pengguna
    username: "",
    password: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset credentials
    setCredentials({
      email: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginUrl = "";
      switch (activeTab) {
        case "user":
          loginUrl = "http://localhost:8000/api/auth/user/login";
          break;
        case "agen":
          loginUrl = "http://localhost:8000/api/auth/agen/login";
          break;
        case "admin":
          loginUrl = "http://localhost:8000/api/auth/admin/login";
          break;
        default:
          break;
      }
  
      // Kirim email bukan username
      const loginCredentials = { email: credentials.email, password: credentials.password };
  
      const response = await axios.post(loginUrl, loginCredentials);
      console.log("Login Response:", response.data);
      
      // Handle successful login
      alert("Login berhasil!");
      switch (activeTab) {
        case "user":
          navigate("/");
          break;
        case "agen":
          navigate("/AgenDashboard");
          break;
        case "admin":
          navigate("/Agen&Admin/Dashboard");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Handle error jika terjadi kesalahan dalam proses login
      alert("Gagal login. Periksa kembali email dan password Anda.");
    }
  };
  

  return (
    <div className="wrap-login">
      <div className="container-login">
        <div className="tab-login">
          <div className="user-login">
            <div
              className={`tab-user ${activeTab === "user" ? "active" : ""}`}
              onClick={() => handleTabChange("user")}
            >
              User
            </div>
            <div
              className={`tab-agen ${activeTab === "agen" ? "active" : ""}`}
              onClick={() => handleTabChange("agen")}
            >
              Agen
            </div>
            <div
              className={`tab-admin ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => handleTabChange("admin")}
            >
              Admin
            </div>
          </div>
        </div>
        <div className="wrap-form-login">
          <div className="form-login">
            {activeTab === "user" && (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email" className="label-input-login">Email</label>
                  <div className="input-with-icon">
                    <MdEmail className="icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input-input-login"
                      placeholder="Masukkan email anda"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-input-login">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-input-login"
                    placeholder="Masukkan password anda"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remember" className="label-input-login">
                    <input type="checkbox" id="remember" name="remember" />
                    Remember me
                  </label>
                </div>
                <button type="submit">Login</button>
              </form>
            )}
            {activeTab === "agen" && (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username" className="label-input-login">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="input-input-login"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-input-login">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-input-login"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            )}
            {activeTab === "admin" && (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username" className="label-input-login">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="input-input-login"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-input-login">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-input-login"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
