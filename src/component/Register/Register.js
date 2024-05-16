import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Sesuaikan dengan nama file CSS Anda
import { MdEmail } from "react-icons/md";

function Register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    nama: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
    no_tlpn: "",
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: newValue,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/auth/user/register`, credentials);
      console.log("Registration Response:", response.data);
      // Lakukan penanganan respons dari API sesuai kebutuhan aplikasi
      navigate("/Pengenalan");
    } catch (error) {
      console.error("Registration Error:", error);
      // Handle error jika terjadi kesalahan dalam proses registrasi
    }
  };

  return (
    <div className="wrap-register">
      <div className="container-register">
        <div className="wrap-form-register">
          <form onSubmit={handleRegister} className="form-register">
            {/* Form Components */}
            <div className="form-group">
              <label className="label-input-register" htmlFor="nama">Nama:</label>
              <input className="input-input-register" type="text" id="nama" name="nama" placeholder="Masukkan nama Anda" value={credentials.nama} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="label-input-register" htmlFor="email">Email:</label>
              <div className="input-with-icon">
                <MdEmail className="icon" />
                <input className="input-input-register" type="email" id="email" name="email" placeholder="Masukkan email Anda" value={credentials.email} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="label-input-register" htmlFor="username">Username:</label>
              <input className="input-input-register" type="text" id="username" name="username" placeholder="Masukkan username Anda" value={credentials.username} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="label-input-register" htmlFor="password">Password:</label>
              <input className="input-input-register" type="password" id="password" name="password" placeholder="Masukkan password Anda" value={credentials.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="label-input-register" htmlFor="confirm">Konfirmasi Password:</label>
              <input className="input-input-register" type="password" id="confirm" name="confirm" placeholder="Masukkan ulang password Anda" value={credentials.confirm} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="label-input-register" htmlFor="no_tlpn">Nomer Telpon:</label>
              <input className="input-input-register" type="text" id="no_tlpn" name="no_tlpn" placeholder="Masukkan ulang password Anda" value={credentials.no_tlpn} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="checkbox" id="terms" name="terms" checked={credentials.terms} onChange={handleChange} />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
