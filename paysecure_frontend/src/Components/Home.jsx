import React from "react";
import { Link } from "react-router-dom";
import VideoFile from "../assets/Video.mp4";

function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden border-4 border-gray-800">
              <video
                src={VideoFile}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] h-6 bg-gray-700 rounded-b-3xl shadow-lg"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6 text-center md:text-left order-2 md:order-1 px-4 sm:px-6 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug">
              Receive & Withdraw Payments Directly to your <br />
              Account @ <span className="text-blue-700">0% Transaction Fee</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Simplify Payments with Next-Gen <br />
              QR Code Solutions
            </p>

            <Link
              to="/Login"
              className="inline-block mt-4 px-6 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition-colors duration-300 text-sm sm:text-base md:text-lg"
            >
              Continue &gt;
            </Link>
          </div>

        </div>
      </div>
      <hr />
    </>
  );
}

export default Home;