import React from "react";
function Footer() {
    return (
        <footer className="bg-[#476EAE] text-white">

            <div className="text-center text-sm py-4 bg-[#476EAE]">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Pay Secure</span>. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer;