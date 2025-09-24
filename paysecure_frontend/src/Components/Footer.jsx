import React from "react";
function Footer() {
    return (
        <footer className="bg-[#476EAE] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-white">Pay Secure</h1>
                    <p className="text-gray-800 leading-relaxed max-w-xs mx-auto md:mx-0">
                        Pay Secure provides a powerful and secure platform for UPI and QR-based payments.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#">
                            <img src="https://img.icons8.com/ios-filled/24/1f2937/facebook-new.png" alt="Facebook" />
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-filled/24/1f2937/twitter.png" alt="Twitter" />
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-filled/24/1f2937/linkedin.png" alt="LinkedIn" />
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-filled/24/1f2937/youtube.png" alt="YouTube" />
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-filled/24/1f2937/github.png" alt="GitHub" />
                        </a>
                    </div>

                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline text-gray-800">Home</a></li>
                        <li><a href="/" className="hover:underline text-gray-800">About</a></li>
                        <li><a href="/" className="hover:underline text-gray-800">Services</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline text-gray-800">Installation Plan</a></li>
                        <li><a href="#" className="hover:underline text-gray-800">Customization</a></li>
                        <li><a href="#" className="hover:underline text-gray-800">Free Consultation</a></li>
                        <li><a href="#" className="hover:underline text-gray-800">Sales Support</a></li>
                        <li><a href="#" className="hover:underline text-gray-800">Technical Support</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-gray-800">
                        <li>Email: info@businessbuddyindia.com</li>
                        <li>Phone: +91 9076448494</li>
                        <li>Address: D-103, Ganesh Glory 11, Jagatpur, Ahmedabad, India</li>
                    </ul>
                </div>

            </div>
            <hr className="border-gray-700" />
            <div className="text-center text-sm py-4 bg-[#476EAE]">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Pay Secure</span>. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;