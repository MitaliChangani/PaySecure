import React, { useState } from "react";
import { User, Clock, ArrowUpCircle, CreditCard } from "lucide-react";

export default function UserDs() {
    const [activeTab, setActiveTab] = useState("history");
    const [historyTab, setHistoryTab] = useState("pending");
    const [pendingSection, setPendingSection] = useState("withdraw");
    const pendingWithdraws = [
        {
            id: 1,
            bankDetails: {
                bankName: "State Bank of India",
                accountNumber: "123456789012",
                ifsc: "SBIN0001234",
                qrCode: "https://via.placeholder.com/150",
            },
            requestDate: "2025-09-23",
            requestTime: "11:45",
            amount: 3000,
        },
    ];

    const pendingDeposits = [
        {
            id: 1,
            bankDetails: {
                bankName: "HDFC Bank",
                accountNumber: "987654321012",
                ifsc: "HDFC0005678",
                qrCode: "https://via.placeholder.com/150",
            },
            acceptedDate: "2025-09-23",
            acceptedTime: "12:15",
            amount: 4000,
        },
    ];
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col items-center">
                {/* Profile */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={40} className="text-gray-600" />
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">John Doe</h2>
                    <p className="text-sm text-gray-500">+91 9876543210</p>
                </div>

                {/* Menu */}
                <nav className="mt-8 w-full space-y-3">
                    {/* Withdraw Button */}
                    <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "withdraw"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <ArrowUpCircle size={18} className="mr-2" />
                        Withdraw
                    </button>

                    {/* Payment Button */}
                    <button
                        onClick={() => setActiveTab("payment")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "payment"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <CreditCard size={18} className="mr-2" />
                        Payment
                    </button>

                    {/* History Button */}
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "history"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <Clock size={18} className="mr-2" />
                        History
                    </button>

                    {/* Profile Button */}
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "profile"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <User size={18} className="mr-2" />
                        My Profile
                    </button>
                </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">

                {/* Withdraw Tab */}
                {activeTab === "withdraw" && (
                    <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
                        <h1 className="text-2xl font-bold mb-6">Withdraw Money</h1>
                        <form className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount to withdraw"
                                />
                            </div>

                            {/* Bank Details Form */}
                            <div>
                                <label className="block text-gray-700">Bank Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter bank name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Account Number</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter account number"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">IFSC Code</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter IFSC code"
                                />
                            </div>


                            {/* Upload QR Code */}
                            <div>
                                <label className="block text-gray-700 mb-2">Upload QR Code</label>
                                <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">
                                    Choose QR Code
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            // Optional: handle selected file
                                            console.log(e.target.files[0]);
                                        }}
                                    />
                                </label>
                                {/* Optional: show selected file name */}
                                <span className="ml-3 text-gray-600" id="file-name">No file chosen</span>
                            </div>


                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                Withdraw
                            </button>
                        </form>
                    </div>
                )}


                {/* Payment Tab */}

                {activeTab === "payment" && (
                    <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
                        <h1 className="text-2xl font-bold mb-6">Make Payment</h1>
                        <form className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount to pay"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Recipient</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter recipient name"
                                />
                            </div>

                            {/* Download Bank Details */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => alert("Bank details downloaded!")}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-2"
                                >
                                    Download Bank Details
                                </button>

                                {/* Download QR Code */}
                                <button
                                    type="button"
                                    onClick={() => alert("QR Code downloaded!")}
                                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                                >
                                    Download QR Code
                                </button>
                            </div>

                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4">
                                Pay
                            </button>
                        </form>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">History</h1>
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setHistoryTab("pending")}
                                className={`px-4 py-2 rounded-lg font-medium ${historyTab === "pending"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setHistoryTab("complete")}
                                className={`px-4 py-2 rounded-lg font-medium ${historyTab === "complete"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Complete
                            </button>
                        </div>

                        {/* Pending List */}
                        {historyTab === "pending" && (
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
                                    >
                                        <span>Transaction #{item}</span>
                                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                            Pay Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Complete List */}
                        {/* {historyTab === "complete" && (
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
                  >
                    <span>Transaction #{item}</span>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                      Paid
                    </button>
                  </div>
                ))}
              </div>
              
            )} */}
                       

                        {historyTab === "complete" && (
                            <div className="bg-white p-6 rounded-lg shadow max-w-5xl overflow-x-auto">
                                <h2 className="text-xl font-semibold mb-4">Completed Transactions</h2>
                                <table className="min-w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2 text-left">#</th>
                                            <th className="border px-4 py-2 text-left">Status</th>
                                            <th className="border px-4 py-2 text-left">UPI ID</th>
                                            <th className="border px-4 py-2 text-left">Transaction ID</th>
                                            <th className="border px-4 py-2 text-left">Date</th>
                                            <th className="border px-4 py-2 text-left">Time</th>
                                            <th className="border px-4 py-2 text-left">From</th>
                                            <th className="border px-4 py-2 text-left">To</th>
                                            <th className="border px-4 py-2 text-left">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                id: 1,
                                                status: "Withdraw",
                                                upi: "user@upi",
                                                transactionId: "TXN123456",
                                                date: "2025-09-22",
                                                time: "14:30",
                                                from: "John Doe",
                                                to: "Bank Account",
                                                amount: 5000,
                                            },
                                            {
                                                id: 2,
                                                status: "Deposit",
                                                upi: "recipient@upi",
                                                transactionId: "TXN654321",
                                                date: "2025-09-20",
                                                time: "10:15",
                                                from: "Bank Account",
                                                to: "John Doe",
                                                amount: 2000,
                                            },
                                        ].map((tx, index) => (
                                            <tr key={tx.id} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2">{tx.status}</td>
                                                <td className="border px-4 py-2">{tx.upi}</td>
                                                <td className="border px-4 py-2">{tx.transactionId}</td>
                                                <td className="border px-4 py-2">{tx.date}</td>
                                                <td className="border px-4 py-2">{tx.time}</td>
                                                <td className="border px-4 py-2">{tx.from}</td>
                                                <td className="border px-4 py-2">{tx.to}</td>
                                                <td className="border px-4 py-2">₹{tx.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                        <form className="space-y-4 max-w-lg">
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    defaultValue="+91 9876543210"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    defaultValue="johndoe@example.com"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
