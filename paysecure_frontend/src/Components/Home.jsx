import React from "react";
import { Link } from "react-router-dom";
import VideoFile from "../assets/Video.mp4";

import {
  ShieldCheck,
  Zap,
  QrCode,
  DollarSign,
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: "0% Transaction Fee",
      desc: "Send and receive payments without hidden charges.",
    },
    {
      icon: <QrCode className="w-8 h-8 text-blue-600" />,
      title: "Smart QR Code",
      desc: "Accept payments instantly with unique QR codes.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Instant Transfers",
      desc: "Money is credited to your account in real-time.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Secure & Reliable",
      desc: "Advanced encryption keeps your transactions safe.",
    },
  ];
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex justify-center md:justify-end order-1 md:order-2 mt-[-70px]">
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

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/Login"
                className="px-6 py-2 rounded-lg text-white bg-blue-700 font-semibold hover:bg-blue-800 transition-colors duration-300 text-sm sm:text-base md:text-lg"
              >
                Continue &gt;
              </Link>

            </div>
          </div>
        </div>
      </div>
      <section
        id="features"
        className="bg-blue-100 py-16 px-6 sm:px-10 lg:px-20"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Discover the benefits of using our payment solution
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Home;