
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Paket.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Paket() {
  const [paketList, setPaketList] = useState([]);
  const [editPaket, setEditPaket] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false); // Define showAddPopup state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/paket`);
        setPaketList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/paket/${id}`);
      setPaketList(paketList.filter((paket) => paket.id !== id));
      console.log("Paket deleted successfully");
    } catch (error) {
      console.error("Error deleting paket:", error);
    }
  };

  const handleEdit = (paket) => {
    setEditPaket(paket);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditPaket(null);
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/paket/${editPaket.id}`, editPaket);
      console.log("Paket updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating paket:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditPaket({ ...editPaket, [name]: value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="paket-wrap">
        <button className="add-button" onClick={() => setShowAddPopup(true)}>
          Tambah Paket
          </button> {/* Add button for showing add popup */}
        <div className="container-paket">
          <div className="table-paket-content">
            <table>
              <thead>
                <tr>
                  <th>ID Paket</th>
                  <th>Nama Paket</th>
                  <th>Deskripsi</th>
                  <th>Transportasi</th>
                  <th>Jenis Transportasi</th>
                  <th>Hotel</th>
                  <th>Kota</th>
                  <th>Kuliner</th>
                  <th>Kuliner</th>
                  <th>Harga Paket</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paketList.map((paket) => (
                  <tr key={paket.id_paket}>
                    <td>{paket.id_paket}</td>
                    <td>{paket.nama_paket}</td>
                    <td>{paket.deskripsi}</td>
                    <td>{paket.destinasi}</td>
                    <td>{paket.transportasi}</td>
                    <td>{paket.hotel}</td>
                    <td>{paket.harga_paket}</td>
                    <td>{paket.fasilitas}</td>
                    <td>{paket.kuliner}</td>
                    <td><img src={paket.foto} alt="Foto" /></td>
                    <td>{paket.rating}</td>
                    <td>
                      <button className="action-delete" onClick={() => handleDelete(paket.id_paket)}> <MdDelete /> </button>
                      <button className="action-edit" onClick={() => handleEdit(paket)}> <CiEdit /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="edit-title">Edit Paket</h2>
            <form onSubmit={handleSubmitEdit}>
              {/* Input fields for editing */}
            </form>
          </div>
        </div>
      )}
      {/* Add popup */}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="add-title">Tambah Paket</h2>
            {/* Form for adding new paket */}
            <button className="popup-btn" onClick={() => setShowAddPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paket;
