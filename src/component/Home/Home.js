import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import BG from "../../Assets/bg.png";
import logo from "../../Assets/Trip Plan.png";
import "./Home.css";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Baliawesome1 from "../../Assets/BALI - awesome waterfalls near UBUD1.jpeg";

function Home({
  origin,setOrigin,destination, setDestination, budget, setBudget, berangkat, setBerangkat,
}) {
  // const [origin, setOrigin] = useState("");
  // const [destination, setDestination] = useState("");
  // const [budget, setBudget] = useState("");
  // const [berangkat, setBerangkat] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/paket/budget`,
        {
          dari: origin,
          tujuan: destination,
          tanggal_berangkat: berangkat,
          budget: budget,
        }
      );

      if (response.status === 200 && response.data.length > 0) {
        navigate("/PaketWisata");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Mohon maaf tujuan " + destination + " belum tersedia");
      } else if (error.response && error.response.status === 400) {
        alert("Maaf, budget Anda belum kami temukan untuk tujuan " + destination);
      } else {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memuat data");
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleBerangkatChange = (e) => {
    const selectedDate = e.target.value;
    setBerangkat(selectedDate);
    setCheckIn(selectedDate);
  };

  return (
    <div className="body">
      <Navbar />
      <div className="background" style={{ backgroundImage: `url(${BG})` }}>
        <div className="judul-konten">
          <h1>
            Rencanakan Perjalanan <br /> anda dan dapatkan harga termurah
          </h1>
          <p>Temukan pengalaman perjalanan yang tak terlupakan.</p>
        </div>
        <div className="button">
          <div className="content">
            <button onClick={openPopup} className="SubmitPaket">
              Create Your Trip Plan
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h2 className="judul-content">Plan Your Trip</h2>
            <div className="container-content">
              <div className="content-1">
                <div className="form-group">
                  <label>Dari</label>
                  <select
                    className="form-control"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="">Pilih tempat asal</option>
                    <option value="Jakarta">Jakarta</option>
                  </select>
                </div>
              </div>
              <div className="content-1">
                <div className="icon-container">
                  <div className="icon" onClick={handleSwap}>
                    <MdSwapHorizontalCircle />
                  </div>
                </div>
              </div>
              <div className="content-1">
                <div className="form-group">
                  <label>Ke</label>
                  <select
                    className="form-control"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">Pilih tujuan</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bali">Bali</option>
                  </select>
                </div>
              </div>

              <div className="content-1">
                <div className="form-group-date">
                  <label>Berangkat</label>
                  <input
                    type="date"
                    className="date-control"
                    value={berangkat}
                    onChange={handleBerangkatChange}
                  />
                </div>
              </div>

              <div className="content-1">
                <div className="form-group-date">
                  <label>Check In</label>
                  <input
                    type="date"
                    className="date-control"
                    value={checkIn}
                    readOnly
                  />
                </div>
              </div>

              <div className="content-1">
                <div className="form-group-date">
                  <label>Check Out</label>
                  <input
                    type="date"
                    className="date-control"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="content-1">
                <div className="form-group-budget">
                  <label className="budget">Budget</label>
                  <input
                    type="text"
                    className="budget-control"
                    placeholder="Your Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {loading && (
                <button type="button" onClick={handleSubmit}>
                  Loading...
                </button>
              )}
              {!loading && (
                <button className="searchpaket" type="button" onClick={handleSubmit}>
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="containerHome">
        <section className="body-bantuan" id="bantuan">
          <div className="wrap-bantuan">
            <h2 className="judul-bantuan">Bagaimana cara menggunakannya?</h2>
          </div>
          <div className="content-bantuan">
            <div className="content-bantuan-vidio">
              <div className="vidio">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  title="Tutorial Penggunaan Fitur"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section className="body-about" id="about">
          <div className="tentang-kami">
            <div className="text-wrapper">Tentang Kami</div>
            <div className="content">
              <div className="row">
                <div className="image-container">
                  <img className="img" alt={Baliawesome1} src={Baliawesome1} />
                </div>
                <div className="description">
                  <p className="div">
                    Kami adalah sebuah tim yang berdedikasi untuk memberikan pengalaman perjalanan yang tak terlupakan kepada setiap pelanggan kami. Dengan lebih dari sepuluh tahun pengalaman dalam industri perjalanan, kami telah menjadi mitra yang tepercaya bagi mereka yang mencari petualangan, kenyamanan, dan inspirasi. Kami percaya bahwa setiap perjalanan adalah sebuah cerita yang unik, dan kami berkomitmen untuk menyediakan layanan yang dapat disesuaikan dengan kebutuhan dan keinginan setiap pelanggan kami.
                  </p>
                  <p className="p">
                    Di dalam perjalanan kami, kami tidak hanya menawarkan destinasi indah dan akomodasi yang nyaman, tetapi juga menyediakan pengalaman lokal yang autentik dan aktivitas yang menginspirasi. Dari petualangan alam yang menantang hingga keindahan budaya yang memukau, kami menghadirkan beragam pilihan untuk memenuhi berbagai minat dan preferensi. Dengan keragaman destinasi yang kami tawarkan, setiap pelanggan kami dapat menemukan petualangan yang sesuai dengan impian mereka.
                  </p>
                  <p className="text-wrapper-2">
                    Kami bangga menjadi bagian dari perjalanan hidup Anda dan berkomitmen untuk memberikan pengalaman yang tak terlupakan setiap kali Anda memilih kami sebagai mitra perjalanan Anda. Dengan dukungan tim profesional kami dan layanan pelanggan yang responsif, kami berusaha untuk menjadikan setiap perjalanan Anda mengesankan, mulai dari perencanaan hingga pulang ke rumah. Bersama kami, mari jelajahi dunia, menciptakan kenangan yang akan bertahan seumur hidup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <img src={logo} alt="logo" />
            </div>
            <div className="footer-col">
              <h4>Pembayaran</h4>
              <ul>
                <li>Shopeepay</li>
                <li>Gopay</li>
                <li>Dana</li>
                <li>Qris</li>
                <li>M-banking</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow me</h4>
              <ul>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Tiktok</li>
                <li>Youtube</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Thanks To</h4>
              <ul>
                <li>Tuhan YME</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Trip Planner App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
