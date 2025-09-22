import React from "react";
import { Link } from "react-router-dom"; 
import VideoFile from "../assets/Video.mp4";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-snug">
            Receive & Withdraw Payments Directly to your <br />
            Account @{" "}
            <span className="text-blue-700">0% Transaction Fee</span>
          </h1>

          <p className="text-gray-600 text-lg sm:text-xl">
            Simplify Payments with Next-Gen <br />
            Dynamic QR Code Solutions
          </p>

          <p className="text-xs sm:text-sm text-gray-500">
            *Pay Secure provides Dynamic QR Generating service. See full disclaimer below.
          </p>

          <Link
            to="/Login"
            className="inline-block mt-4 text-blue-700 font-semibold hover:underline text-base sm:text-lg"
          >
            Continue &gt;
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-3xl aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden border-4 border-gray-800">
            
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

      </div>
    </div>
  );
}

export default Home;