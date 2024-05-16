import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Agen.css";
import axios from "axios";

function Agen() {
  const [agens, setAgens] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol tampilan popup tambah agen
  const [showEditPopup, setShowEditPopup] = useState(false); // State untuk mengontrol tampilan popup edit agen
  const [newAgen, setNewAgen] = useState({
    name: "",
    username: "",
    password: ""
  });
  const [editAgenData, setEditAgenData] = useState(null); // State untuk menyimpan data agen yang akan diedit

  // Definisikan fungsi async untuk mengambil data agen dari backend
  const fetchAgens = async () => {
    try {
      // Panggil endpoint API yang digunakan untuk mendapatkan data agen dari backend
      const response = await axios.get("http://127.0.0.1:8000/api/auth/agen/"); // Sesuaikan URL dengan endpoint yang benar
      // Setel data agen yang diterima dari backend ke state agens
      setAgens(response.data);
    } catch (error) {
      console.error("Error fetching agens:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchAgens ketika komponen Agen dipasang (mounted)
    fetchAgens();
  }, []);

  // Fungsi untuk menghapus agen berdasarkan ID
  const deleteAgen = async (id) => {
    try {
      // Kirim permintaan DELETE ke endpoint yang sesuai di backend
      await axios.delete(`http://127.0.0.1:8000/api/auth/agen/${id}`); // Sesuaikan URL dengan endpoint yang benar
      // Perbarui data agen setelah penghapusan
      setAgens(agens.filter((agen) => agen.id !== id));
    } catch (error) {
      console.error("Error deleting agen:", error);
    }
  };

  // Fungsi untuk menampilkan popup tambah agen
  const showAddPopup = () => {
    setShowPopup(true);
  };

  // Fungsi untuk menyembunyikan popup tambah agen
  const hideAddPopup = () => {
    setShowPopup(false);
  };

  // Fungsi untuk menampilkan popup edit agen
  const toggleshowEditPopup = (agen) => {
    setEditAgenData(agen);
    setShowEditPopup(true);
  };

  // Fungsi untuk menyembunyikan popup edit agen
  const hideEditPopup = () => {
    setShowEditPopup(false);
  };

  // Fungsi untuk menambahkan agen baru
  const addAgen = async () => {
    try {
      // Kirim permintaan POST ke endpoint yang sesuai di backend
      await axios.post(`http://127.0.0.1:8000/api/auth/agen/store`, newAgen); // Sesuaikan URL dengan endpoint yang benar dan kirimkan data agen baru
      // Setel kembali nilai newAgen ke default setelah berhasil menambahkan agen baru
      setNewAgen({
        name: "",
        username: "",
        password: ""
      });
      // Panggil kembali fungsi fetchAgens untuk memperbarui daftar agen setelah penambahan
      fetchAgens();
      // Sembunyikan popup tambah agen setelah berhasil menambahkan agen baru
      hideAddPopup();
    } catch (error) {
      console.error("Error adding agen:", error);
      // Tampilkan pesan kesalahan kepada pengguna menggunakan alert
      alert("Gagal menambahkan agen. Silakan coba lagi.");
    }
  };
  

  // Fungsi untuk menyunting data agen
  const editAgen = async () => {
    try {
      // Kirim permintaan PUT ke endpoint yang sesuai di backend untuk menyunting agen berdasarkan ID
      await axios.put(`http://127.0.0.1:8000/api/auth/agen/${editAgenData.id}`, editAgenData); // Sesuaikan URL dengan endpoint yang benar dan kirimkan data agen yang telah diedit
      // Panggil kembali fungsi fetchAgens untuk memperbarui daftar agen setelah penyuntingan
      fetchAgens();
      // Sembunyikan popup edit agen setelah berhasil menyunting agen
      hideEditPopup();
    } catch (error) {
      console.error("Error editing agen:", error);
    }
  };

  // Handler untuk mengubah nilai newAgen saat input diubah
  const handleInputChange = (e) => {
    setNewAgen({ ...newAgen, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="Agen-wrap">
        <div className="container-agen">
          <button className="button-tambah-agen" onClick={showAddPopup}>
            Tambah Agen
          </button>

          {/* Tampilkan popup tambah agen jika showPopup bernilai true */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2 className="edit-judul">Form Tambah Agen</h2>
                {/* Isi dengan form tambah agen */}
                <form onSubmit={addAgen}>
                  <input
                    type="text"
                    name="name"
                    className="popup-content-form"
                    placeholder="Nama"
                    value={newAgen.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="username"
                    className="popup-content-form"
                    placeholder="Username"
                    value={newAgen.username}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="password"
                    className="popup-content-form"
                    placeholder="Password"
                    value={newAgen.password}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="tambah-form">Tambah</button>
                </form>
                <button className="close-btn-form" onClick={hideAddPopup}>
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Tampilkan popup edit agen jika showEditPopup bernilai true */}
          {showEditPopup && editAgenData && (
            <div className="popup">
              <div className="popup-content">
                <h2 className="edit-judul">Form Edit Agen</h2>
                {/* Isi dengan form edit agen */}
                <form onSubmit={editAgen}>
                  <input
                    type="text"
                    name="name"
                    className="popup-content-form"
                    placeholder="Nama"
                    value={editAgenData.name}
                    onChange={(e) => setEditAgenData({ ...editAgenData, name: e.target.value })}
                  />
                  <
                  input
                    type="text"
                    name="username"
                    className="popup-content-form"
                    placeholder="Username"
                    value={editAgenData.username}
                    onChange={(e) => setEditAgenData({ ...editAgenData, username: e.target.value })}
                  />
                  <input
                    type="password"
                    name="password"
                    className="popup-content-form"
                    placeholder="Password"
                    value={editAgenData.password}
                    onChange={(e) => setEditAgenData({ ...editAgenData, password: e.target.value })}
                  />
                  <button type="submit" className="edit-form">Edit</button>
                </form>
                <button className="close-btn-form" onClick={hideEditPopup}>
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="table-agen-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Loop melalui data agen dan tampilkan dalam tabel */}
                {agens.map((agen) => (
                  <tr key={agen.id_agen}>
                    <td>{agen.id_agen}</td>
                    <td>{agen.name}</td>
                    <td>{agen.username}</td>
                    <td>{agen.password}</td>
                    {/* Tambahkan tombol untuk action seperti edit atau hapus */}
                    <td>
                      <button className="action-agen-edit" onClick={() => toggleshowEditPopup(agen)}>
                        Edit
                      </button>
                      <button
                        className="action-agen-delete"
                        onClick={() => deleteAgen(agen.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agen;
