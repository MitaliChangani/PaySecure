import React, { useState } from "react";
import { User, Clock, ArrowUpCircle, CreditCard } from "lucide-react";

export default function UserDs() {
    const [activeTab, setActiveTab] = useState("history");
    const [historyTab, setHistoryTab] = useState("pending");
    const [pendingSection, setPendingSection] = useState("withdraw");
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

            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col items-center">

                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={40} className="text-gray-600" />
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">John Doe</h2>
                    <p className="text-sm text-gray-500">Johndoe@gmail.com</p>
                </div>

                <nav className="mt-8 w-full space-y-3">

                    <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "withdraw"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <ArrowUpCircle size={18} className="mr-2" />
                        Pay Out
                    </button>

                    <button
                        onClick={() => setActiveTab("payment")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${activeTab === "payment"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <CreditCard size={18} className="mr-2" />
                        Pay In
                    </button>

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

            <main className="flex-1 p-8 overflow-y-auto">

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
                            <div>
                                <label className="block text-gray-700">Bank Account Holder Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Bank Account Holder name"
                                />
                            </div>
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
                            <div>
                                <label className="block text-gray-700">UpiId</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter UpiId"
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

                                            console.log(e.target.files[0]);
                                        }}
                                    />
                                </label>
                                <span className="ml-3 text-gray-600" id="file-name">No file chosen</span>
                            </div>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                Withdraw Request
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
                                <label className="block text-gray-700">Franchise Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Franchise Name"
                                />
                            </div>


                            {/* Bank Details Section */}
                            <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Bank Details
                                </h2>
                                <p><span className="font-medium">Bank Name:</span> HDFC Bank</p>
                                <p><span className="font-medium">Account Number:</span> 987654321012</p>
                                <p><span className="font-medium">IFSC Code:</span> HDFC0005678</p>
                                <p><span className="font-medium">UPI ID:</span> franchise@upi</p>

                                {/* QR Code Section */}
                                <div className="mt-4 flex items-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => alert("QR Code downloaded!")}
                                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        Download QR Code
                                    </button>
                                </div>
                            </div>
                            {/* <div>
                                <button
                                    type="button"
                                    onClick={() => alert("Bank details downloaded!")}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-2"
                                >
                                    Download Bank Details
                                </button>

                                <button
                                    type="button"
                                    onClick={() => alert("QR Code downloaded!")}
                                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                                >
                                    Download QR Code
                                </button>
                            </div> */}

                            {/* Pay Button */}
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4">
                                Pay
                            </button>
                        </form>
                    </div>
                )}
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
                        {historyTab === "pending" && (
                            <div className="bg-white p-6 rounded-lg shadow w-full overflow-x-auto">
                                <h2 className="text-xl font-semibold mb-4">Withdraw Requests</h2>
                                <table className="min-w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="border px-4 py-2">#</th>
                                            <th className="border px-4 py-2">Franchise Name</th>
                                            <th className="border px-4 py-2">Account Holder</th>
                                            <th className="border px-4 py-2">Account Number</th>
                                            <th className="border px-4 py-2">Bank Name</th>
                                            <th className="border px-4 py-2">IFSC</th>
                                            <th className="border px-4 py-2">UPI ID</th>
                                            <th className="border px-4 py-2">Amount</th>
                                            <th className="border px-4 py-2">Date</th>
                                            <th className="border px-4 py-2">Time</th>
                                            <th className="border px-4 py-2">Status</th>
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
                        {/* Complete List */}
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
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    defaultValue="johnduo@gmail.com"
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