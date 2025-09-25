import React from "react";
import { Link } from "react-router-dom";
import VideoFile from "../assets/Video.mp4";

import {
  ShieldCheck,
  Zap,
  QrCode,
  DollarSign,
  Users,
  CreditCard,
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
      <div className="bg-blue-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
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
          <div className="flex flex-col justify-center space-y-6 text-center order-2 md:order-1 px-4 sm:px-6 md:px-0">

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug">
              Receive & Withdraw Payments Directly to your <br />
              Account @ <span className="text-blue-700">0% Transaction Fee</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Simplify Payments with Next-Gen <br />
              QR Code Solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/Login"
                className="px-8 py-3 rounded-lg text-white bg-blue-700 font-semibold hover:bg-blue-800 transition-colors duration-300 text-base sm:text-lg md:text-xl text-center"
              >
                Continue &gt;
              </Link>
            </div>

          </div>
        </div>
      </div>
      <section
        id="features"
        className="bg-blue-50 pt-8 pb-16 px-6 sm:px-10 lg:px-20"
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
      <section className="bg-blue-50 py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">Just three simple steps to get started</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">1. Sign Up</h3>
            <p className="text-gray-600 mt-2">Create your free account in minutes.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">2. Generate QR</h3>
            <p className="text-gray-600 mt-2">Get your unique QR code for payments.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">3. Get Paid</h3>
            <p className="text-gray-600 mt-2">Receive money directly in your account.</p>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">Trusted by businesses and individuals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">“This app has made payments so simple and quick!”</p>
            <h4 className="mt-4 font-semibold text-gray-900">— Aditi Sharma</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">“The QR feature is amazing, my customers love it.”</p>
            <h4 className="mt-4 font-semibold text-gray-900">— Rajesh Kumar</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">“Secure and reliable platform. Highly recommended.”</p>
            <h4 className="mt-4 font-semibold text-gray-900">— Priya Mehta</h4>
          </div>
        </div>
      </section>
      <section className="bg-blue-100 text-black py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join thousands of users who trust our secure and instant payment solution.</p>
          <Link
            to="/Register"
            className="px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
          >
            Sign Up Free
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;