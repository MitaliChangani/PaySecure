import React, { useState } from "react";
import { User, Clock, ArrowUpCircle, CreditCard } from "lucide-react";
import ProfilePic from "../assets/profile.jpg"; // 👈 update filename/path if needed

export default function UserDs() {
    const [activeTab, setActiveTab] = useState("history");
    const [historyTab, setHistoryTab] = useState("pending");

    const withdrawRequests = [
        {
            id: 1,
            franchiseName: "Franchise A",
            accountName: "John Doe",
            accountNumber: "123456789012",
            bankName: "State Bank of India",
            ifsc: "SBIN0001234",
            upiId: "john@upi",
            amount: 5000,
            date: "2025-09-22",
            time: "10:45 AM",
            status: "Pending",
        },
        {
            id: 2,
            franchiseName: "Franchise B",
            accountName: "Jane Smith",
            accountNumber: "987654321098",
            bankName: "HDFC Bank",
            ifsc: "HDFC0005678",
            upiId: "jane@upi",
            amount: 3000,
            date: "2025-09-21",
            time: "03:20 PM",
            status: "Pending",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Icons Bar */}
            <div className="w-full bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 px-6 py-3">
                    {[
                        { key: "withdraw", label: "Pay-out", icon: <ArrowUpCircle size={20} /> },
                        { key: "payment", label: "Pay-in", icon: <CreditCard size={20} /> },
                        { key: "history", label: "History", icon: <Clock size={20} /> },
                        { key: "profile", label: "Profile", icon: <User size={20} /> },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.key
                                    ? "bg-[#476EAE] text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        {/* Withdraw Tab */}
                        {activeTab === "withdraw" && (
                            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 ">
                                <h1 className="text-2xl font-bold text-center mb-6">Withdraw Money</h1>
                                <form className="space-y-4 max-w-md mx-auto">
                                    <input className="input-field" type="number" placeholder="Enter amount to withdraw" />
                                    <input className="input-field" type="text" placeholder="Bank Account Holder Name" />
                                    <input className="input-field" type="text" placeholder="Bank Name" />
                                    <input className="input-field" type="text" placeholder="Account Number" />
                                    <input className="input-field" type="text" placeholder="IFSC Code" />
                                    <input className="input-field" type="text" placeholder="UPI ID" />

                                    <div>
                                        <label className="block text-gray-700 mb-2">Upload QR Code</label>
                                        <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">
                                            Choose QR Code
                                            <input type="file" accept="image/*" className="hidden" />
                                        </label>
                                        <span className="ml-3 text-gray-600" id="file-name">No file chosen</span>
                                    </div>

                                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full">
                                        Withdraw Request
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Payment Tab */}
                        {activeTab === "payment" && (
                            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                                <h1 className="text-2xl font-bold text-center mb-6">Make Payment</h1>
                                <div className="max-w-md mx-auto space-y-4">
                                    <div className="bg-gray-50 border rounded-lg p-4">
                                        <h2 className="text-lg font-semibold mb-2">Bank Details</h2>
                                        <p><span className="font-medium">Bank Name:</span> HDFC Bank</p>
                                        <p><span className="font-medium">Account Number:</span> 987654321012</p>
                                        <p><span className="font-medium">IFSC Code:</span> HDFC0005678</p>
                                        <p><span className="font-medium">UPI ID:</span> franchise@upi</p>
                                        <button
                                            type="button"
                                            onClick={() => alert("QR Code downloaded!")}
                                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 mt-4"
                                        >
                                            Download QR Code
                                        </button>
                                    </div>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">Pay</button>
                                </div>
                            </div>
                        )}

                        {/* History Tab */}
                        {activeTab === "history" && (
                            <div>
                                <h1 className="text-2xl font-bold mb-6">History</h1>
                                <div className="flex flex-wrap gap-4 mb-6">
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

                                {/* Pending Table */}
                                {historyTab === "pending" && (
                                    <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                                        <h2 className="text-xl font-semibold mb-4">Withdraw Requests</h2>
                                        <table className="min-w-full border border-gray-300 text-sm md:text-base">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    {[
                                                        "#",
                                                        "Franchise Name",
                                                        "Account Holder",
                                                        "Account Number",
                                                        "Bank Name",
                                                        "IFSC",
                                                        "UPI ID",
                                                        "Amount",
                                                        "Date",
                                                        "Time",
                                                        "Status",
                                                    ].map((th) => (
                                                        <th key={th} className="border px-4 py-2 text-left">{th}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {withdrawRequests.map((req, index) => (
                                                    <tr key={req.id} className="hover:bg-gray-50">
                                                        <td className="border px-4 py-2">{index + 1}</td>
                                                        <td className="border px-4 py-2">{req.franchiseName}</td>
                                                        <td className="border px-4 py-2">{req.accountName}</td>
                                                        <td className="border px-4 py-2">{req.accountNumber}</td>
                                                        <td className="border px-4 py-2">{req.bankName}</td>
                                                        <td className="border px-4 py-2">{req.ifsc}</td>
                                                        <td className="border px-4 py-2">{req.upiId}</td>
                                                        <td className="border px-4 py-2">₹{req.amount.toLocaleString()}</td>
                                                        <td className="border px-4 py-2">{req.date}</td>
                                                        <td className="border px-4 py-2">{req.time}</td>
                                                        <td className="border px-4 py-2">{req.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Complete Table */}
                                {historyTab === "complete" && (
                                    <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                                        <h2 className="text-xl font-semibold mb-4">Completed Transactions</h2>
                                        <table className="min-w-full border border-gray-300 text-sm md:text-base">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    {[
                                                        "#",
                                                        "Status",
                                                        "UPI ID",
                                                        "Transaction ID",
                                                        "Date",
                                                        "Time",
                                                        "From",
                                                        "To",
                                                        "Amount",
                                                    ].map((th) => (
                                                        <th key={th} className="border px-4 py-2 text-left">{th}</th>
                                                    ))}
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
                            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto ">
                                <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

                                {/* Profile Image */}
                                <div className="mt-6 flex justify-center mb-6">
                                    <img
                                        src={ProfilePic}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
                                    />
                                    {/* <img
                                        src={ProfilePic}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full shadow-md"
                                    /> */}

                                </div>

                                {/* Profile Form */}
                                <form className="space-y-4">
                                    <input
                                        className="input-field"
                                        type="text"
                                        defaultValue="John Doe"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        className="input-field"
                                        type="email"
                                        defaultValue="johnduo@gmail.com"
                                        placeholder="Email"
                                    />

                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex-1"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => alert("Reset Password triggered!")}
                                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex-1"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
                .input-field {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    focus-ring: 2px;
                    focus-ring-color: #3b82f6;
                }
            `}</style>
        </div>
    );
}
