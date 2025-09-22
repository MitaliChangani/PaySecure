import React from "react";

function Footer() {
    return (
        <footer className="bg-blue-100 from-pink-200 via-purple-200 to-blue-200 text-gray-800 ">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-blue-700">Pay Secure</h1>
                    <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                        Pay Secure provides a powerful and secure platform for UPI and QR-based payments.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/facebook-new.png" alt="Facebook" /></a>
                        <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/twitter.png" alt="Twitter" /></a>
                        <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/linkedin.png" alt="LinkedIn" /></a>
                        <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/youtube.png" alt="YouTube" /></a>
                        <a href="#"><img src="https://img.icons8.com/ios-filled/24/000000/github.png" alt="GitHub" /></a>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-blue-700">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/services" className="hover:underline">Services</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-blue-700">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Installation Plan</a></li>
                        <li><a href="#" className="hover:underline">Customization</a></li>
                        <li><a href="#" className="hover:underline">Free Consultation</a></li>
                        <li><a href="#" className="hover:underline">Sales Support</a></li>
                        <li><a href="#" className="hover:underline">Technical Support</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-blue-700">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: info@businessbuddyindia.com</li>
                        <li>Phone: +91 9076448494</li>
                        <li>Address: D-103, Ganesh Glory 11, Jagatpur, Ahmedabad, India</li>
                    </ul>
                </div>

            </div>
            <hr></hr> 
            <div className="text-center text-sm py-4 bg-blue-100 from-blue-100 via-purple-100 to-pink-100">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700 ">Pay Secure</span>. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;