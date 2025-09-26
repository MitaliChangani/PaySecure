import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ForgotResetPassword() {
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Reset password
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // OTP countdown
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Countdown effect
  useEffect(() => {
    if (!otpSent) return; // start timer only if OTP sent

    setTimeLeft(300); // reset timer to 5 mins on new OTP

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [otpSent]); // depend only on otpSent



  // Send OTP
  const handleSendOtp = async () => {
    if (!username) return alert("Enter your username first");

    try {
      await axios.post("http://localhost:8000/api/forgot-password/", { username }, { withCredentials: true });
      alert("OTP sent successfully!");
      setOtpSent(true); // triggers useEffect
      setTimeLeft(300); // reset timer
      setStep(2);
      setOtp("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };


  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    console.log("Attempting to reset password...");
    console.log("Username:", username, "OTP:", otp, "New Password:", newPassword);
    console.log("Time left:", timeLeft);

    // Frontend check for timer expiry
    if (timeLeft <= 0) {
      console.warn("Frontend timer expired");
      return alert("OTP expired. Please request a new OTP.");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/",
        { username, otp, new_password: newPassword },
        { withCredentials: true }
      );

      console.log("Reset password response:", response);
      alert(response.data.detail);
      navigate("/login");

      // Reset all states
      setStep(1);
      setOtpSent(false);
      setTimeLeft(0);
      setUsername("");
      setOtp("");
      setNewPassword("");

    } catch (error) {
      // Detailed logging
      console.error("Reset password error object:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }

      // Show user-friendly alert
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Username input */}
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
              disabled={otpSent} // read-only after OTP sent
            />
          </div>

          {/* Step 1: Send OTP */}
          {step === 1 && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>
          )}

          {/* Step 2: Reset password */}
          {step === 2 && (
            <>
              {/* OTP countdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  OTP expires in {Math.floor(timeLeft / 60)}:
                  {("0" + (timeLeft % 60)).slice(-2)}
                </span>
              </div>

              {/* OTP input */}
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

              {/* New Password input */}
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

              {/* Reset Password button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                disabled={timeLeft <= 0} // disables if OTP expired
              >
                Reset Password
              </button>
            </>
          )}
        </form>

      </div>
    </div>
  );
}

export default ForgotResetPassword;
