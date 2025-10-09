import React, { useState, useEffect } from "react";
import axios from "axios";
function Otp() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/forgot-password/",
        { username },
        { withCredentials: true }
      );
      alert("OTP sent successfully!");
      setOtpSent(true);
      setTimeLeft(300);
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      alert("OTP expired. Please request a new OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/",
        { username, otp, new_password: newPassword },
        { withCredentials: true }
      );
      alert(response.data.detail);
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={otpSent}
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              disabled={otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
            {otpSent && (
              <span className="text-sm text-gray-600">
                Expires in {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={timeLeft <= 0}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;