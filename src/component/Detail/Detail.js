import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Detail.css";
import { BiMap } from "react-icons/bi";
import { MdEmojiTransportation } from "react-icons/md";
import { BiSolidHotel } from "react-icons/bi";
import { FaBowlFood } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import Navbar from '../Navbar/Navbar';
import logo from "../../Assets/Trip Plan.png";
import Footer from '../Footer/Footer';

function Detail() {
    const [destinationData, setDestinationData] = useState(null);

    useEffect(() => {
        // Fungsi untuk mendapatkan data detail destinasi dari API
        const fetchDestinationData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/destination/1"); // Ganti URL dengan URL API sesuai kebutuhan
                setDestinationData(response.data);
            } catch (error) {
                console.error("Error fetching destination data:", error);
            }
        };

        fetchDestinationData();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='aon-destination-detail-wrap p-t110 aon-bg-white'>
                <div className='container'>
                    <div className='aon-destination-detail-content'>
                        <div className='destination-head'>
                            <div className="destination-card">
                                <div className="card-content">
                                    <div className="card-header">
                                        <img src="path_to_image" alt="Hotel Image" />
                                    </div>
                                    <div className="card-body">
                                        <h3>RAFFLES BALI</h3>
                                        <p>Kota : Bali</p>
                                        <p>Deskripsi singkat tentang hotel</p>
                                        <p>Harga per malam: Rp 4.000.000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <li>Parent</li>
                                <li>UNS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Trip Planner App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Detail;