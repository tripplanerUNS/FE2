import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Hotel.css";

function Hotel() {
  const [hotelList, setHotelList] = useState([]); // Mengganti penggunaList dengan hotelList
  const [editHotel, setEditHotel] = useState(null); // State untuk menyimpan data hotel yang akan diedit
  const [showEditPopup, setShowEditPopup] = useState(false); // State untuk mengontrol tampilan popup edit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/hotels`);
        setHotelList(response.data); // Mengambil data dari endpoint hotel
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/hotel/${id}`);
      setHotelList(hotelList.filter((hotel) => hotel.id !== id));
      console.log("Hotel deleted successfully");
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditHotel(null);
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/auth/hotels/edit/${editHotel.id_hotels}`, editHotel);
      console.log("Hotel updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditHotel({ ...editHotel, [name]: value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="hotel-wrap">
        <div className="container-hotel">
          <div className="table-hotel-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Hotel</th>
                  <th>Alamat</th>
                  <th>Harga Permalam</th>
                  <th>Gambar</th>
                  <th>Kota</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelList.map((hotel) => (
                  <tr key={hotel.id_hotels}>
                    <td>{hotel.id_hotels}</td>
                    <td>{hotel.nama_hotel}</td>
                    <td>{hotel.alamat}</td>
                    <td>{hotel.harga}</td>
                    <td>{hotel.gambar}</td>
                    <td>{hotel.kota}</td>
                    <td>{hotel.rating}</td>
                    <td>
                      <button className="action-agen-delete" onClick={() => handleDelete(hotel.id)}>Delete</button>
                      <button className="action-agen-edit" onClick={() => handleEdit(hotel)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Tampilkan popup edit jika showEditPopup bernilai true */}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="edit-judul">Edit Hotel</h2>
            <form onSubmit={handleSubmitEdit}>
              <input type="text" name="nama" value={editHotel.nama_hotel} onChange={handleInputChange} className="popup-content-form" />
              <input type="text" name="alamat" value={editHotel.alamat} onChange={handleInputChange} className="popup-content-form" />
              <input type="text" name="harga" value={editHotel.harga} onChange={handleInputChange} className="popup-content-form" />
              <input type="image" name="gambar" value={editHotel.gambar} onChange={handleInputChange} className="popup-content-form"></input>
              <button type="submit" className="edit-form">Submit</button>
              <button className="close-btn-form" onClick={handleCloseEditPopup}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotel;
