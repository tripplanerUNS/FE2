import React from 'react';
import './Footer.css'; 
import logo from "../../Assets/Trip Plan.png";

// Komponen footer
function Footer() {
    return (
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
    );
}

export default Footer;
