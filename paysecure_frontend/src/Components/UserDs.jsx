import React, { useState } from "react";
import {
  User,
  Clock,
  ArrowUpCircle,
  CreditCard,
  LayoutDashboard,
  CheckCircle,
  ShieldX,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ProfilePic from "../assets/profile.jpg";

const data = [
  { name: "Mon", amount: 0 },
  { name: "Tue", amount: 0 },
  { name: "Wed", amount: 0 },
  { name: "Thu", amount: 0 },
  { name: "Fri", amount: 0 },
  { name: "Sat", amount: 0 },
  { name: "Sun", amount: 0 },
];

export default function UserDs() {
  const [activeTab, setActiveTab] = useState("history");
  const [historyTab, setHistoryTab] = useState("pending");

  // ✅ Combined and Cleaned Modal States
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [amountInput, setamountInput] = useState("");

  // ✅ Sample Data
  const paymentData = [
    {
      date: "2025-10-08",
      requestId: "REQ12345",
      utrNo: "UTR987654321",
      amount: "₹5000",
      username: "john_doe",
      customerId: "CUST001",
      status: "Successed",
      transactionId: "TXN99887766",
      time: "14:30",
    },
    {
      date: "2025-10-07",
      requestId: "REQ98765",
      utrNo: "UTR123456789",
      amount: "₹1200",
      username: "alex123",
      customerId: "CUST002",
      status: "Pending",
      transactionId: "TXN88776655",
      time: "11:45",
    },
  ];

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

  // ✅ Functions
  const handleView = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      selectedData?.paymentLink || "https://example.com/payment-link"
    );
    alert("Payment link copied!");
  };

  // ✅ Manual Status Update Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Manual Status Updated Successfully!");
    setShowModal(false);
    setUtrInput("");
    setamountInput("");
  };

  // ✅ Add Record Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    alert("New Pay-Out Record Added!");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 px-6 py-3">
          {[
            { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
            { key: "payment", label: "Pay-in", icon: <CreditCard size={20} /> },
            { key: "withdraw", label: "Pay-out", icon: <ArrowUpCircle size={20} /> },
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
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {activeTab === "dashboard" && (
              <>
                <PayInDashboard />
                <PayOutDashboard />
              </>
            )}

           {activeTab === "withdraw" && (
  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
    <h1 className="text-2xl font-bold text-center mb-6">Pay-Out</h1>

    {/* Buttons Row + Filter */}
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">
        All
      </button>
      <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium">
        Initiate
      </button>
      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium">
        Pending
      </button>
      <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium">
        Successed
      </button>
      <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-medium">
        Failed
      </button>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-2 ml-4">
        <span className="font-medium text-gray-700">Filter By:</span>
        <input
          type="date"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Apply
        </button>

        {/* ✅ NEW Add Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          onClick={() => setShowAddModal(true)}
        >
          + Add
        </button>
      </div>
    </div>

    {/* Table Section */}
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Request ID</th>
            <th className="border px-4 py-2 text-left">UTR No.</th>
            <th className="border px-4 py-2 text-left">Amount</th>
            <th className="border px-4 py-2 text-left">Transaction by Username</th>
            <th className="border px-4 py-2 text-left">Customer ID</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Action</th>
            <th className="border px-4 py-2 text-left">#</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">{item.requestId}</td>
              <td className="border px-4 py-2">{item.utrNo}</td>
              <td className="border px-4 py-2">{item.amount}</td>
              <td className="border px-4 py-2">{item.username}</td>
              <td className="border px-4 py-2">{item.customerId}</td>
              <td
                className={`border px-4 py-2 font-medium ${
                  item.status === "Successed"
                    ? "text-green-600"
                    : item.status === "Pending"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {item.status}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleView(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg"
                >
                  View
                </button>
              </td>

              {/* Manual UTR Update */}
              <td
                className="border px-4 py-2 text-center cursor-pointer text-blue-600 hover:text-blue-800"
                title="Click to update UTR manually"
                onClick={() => {
                  setSelectedTx(item);
                  setShowModal(true);
                }}
              >
                ↺
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Manual Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
              Manual Status Update
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  UTR Number
                </label>
                <input
                  type="text"
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="Enter UTR Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => setamountInput(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
)}

{showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        Add New Pay-Out Record
      </h2>

      <form onSubmit={handleAddSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Bank Name" className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Customer ID" className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Account" className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="UPI" className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Account No." className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Account Name" className="border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="IFSC" className="border rounded-lg px-3 py-2" required />
        <input type="number" placeholder="Amount" className="border rounded-lg px-3 py-2" required />

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


            {activeTab === "payment" && (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Pay-in</h1>

                {/* Buttons Row + Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">
                    All
                  </button>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium">
                    Initiate
                  </button>
                  <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium">
                    Pending
                  </button>
                  <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium">
                    Successed
                  </button>
                  <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-medium">
                    Failed
                  </button>

                  {/* Filter Section */}
                  <div className="flex flex-wrap items-center gap-2 ml-4">
                    <span className="font-medium text-gray-700">Filter By:</span>
                    <input
                      type="date"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="date"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="border px-4 py-2 text-left">Date</th>
                        <th className="border px-4 py-2 text-left">Request ID</th>
                        <th className="border px-4 py-2 text-left">UTR No.</th>
                        <th className="border px-4 py-2 text-left">Amount</th>
                        <th className="border px-4 py-2 text-left">Transaction by Username</th>
                        <th className="border px-4 py-2 text-left">Customer ID</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                        <th className="border px-4 py-2 text-left">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{item.date}</td>
                          <td className="border px-4 py-2">{item.requestId}</td>
                          <td className="border px-4 py-2">{item.utrNo}</td>
                          <td className="border px-4 py-2">{item.amount}</td>
                          <td className="border px-4 py-2">{item.username}</td>
                          <td className="border px-4 py-2">{item.customerId}</td>
                          <td
                            className={`border px-4 py-2 font-medium ${item.status === "Successed"
                                ? "text-green-600"
                                : item.status === "Pending"
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                              }`}
                          >
                            {item.status}
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => handleView(item)}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg"
                            >
                              View
                            </button>
                          </td>
                         
                      <td
  className="border px-4 py-2 text-center cursor-pointer text-blue-600 hover:text-blue-800"
  title="Click to update UTR manually"
  onClick={() => {
    setSelectedTx(item);   // ✅ set current row data
    setShowModal(true);    // ✅ open modal
  }}
>
  ↺
</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
                      Manual Status Update
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          UTR Number
                        </label>
                        <input
                          type="text"
                          value={utrInput}
                          onChange={(e) => setUtrInput(e.target.value)}
                          placeholder="Enter UTR Number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Amount
                        </label>
                        <input
                          type="text"
                          value={amountInput}
                          onChange={(e) => setamountInput(e.target.value)}
                          placeholder="Enter Amount"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
                </div>
              </div>
            )}

            {/* Modal */}
            {showModal && selectedData && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-xl font-bold mb-4 text-center">Transaction Details</h2>
                  <div className="space-y-2 text-sm">
                    <p><strong>UTR No.:</strong> {selectedData.utrNo}</p>
                    <p><strong>Amount:</strong> {selectedData.amount}</p>
                    <p><strong>Customer ID:</strong> {selectedData.customerId}</p>
                    <p><strong>Request ID:</strong> {selectedData.requestId}</p>
                    <p><strong>Transaction ID:</strong> {selectedData.transactionId}</p>
                    <p><strong>Date:</strong> {selectedData.date}</p>
                    <p><strong>Time:</strong> {selectedData.time}</p>
                    <p>
                      <strong>Payment Link:</strong>{" "}
                      <a
                        href="https://example.com/payment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        https://example.com/payment-link
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={handleCopy}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}



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
                {historyTab === "pending" && (
                  <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Pay-out Requests</h2>
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
                            status: "Pay-out",
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
                            status: "Pay-in",
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
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto ">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
                <div className="mt-6 flex justify-center mb-6">
                  <img
                    src={ProfilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
                  />
                </div>
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
function PayInDashboard() {
  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Pay In</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-blue-200 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15)_0%,transparent_70%)]"></div>
              <div className="relative flex items-center gap-3">
                <CheckCircle className="text-blue-600" size={26} />
                <div>
                  <p className="font-semibold text-blue-900">Success Txns</p>
                  <p className="text-xl font-bold text-blue-900 mt-1">
                    ₹
                  </p>
                </div>
              </div>
              <p className="relative text-gray-700 font-medium">0 Txns</p>
            </div>
            <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-yellow-200 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.2)_0%,transparent_70%)]"></div>
              <div className="relative flex items-center gap-3">
                <Clock className="text-yellow-700" size={26} />
                <div>
                  <p className="font-semibold text-yellow-900">Pending Txns</p>
                  <p className="text-xl font-bold text-yellow-900 mt-1">
                    ₹
                  </p>
                </div>
              </div>
              <p className="relative text-gray-700 font-medium">0 Txns</p>
            </div>
            <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-red-200 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.2)_0%,transparent_70%)]"></div>
              <div className="relative flex items-center gap-3">
                <ShieldX className="text-red-600" size={26} />
                <div>
                  <p className="font-semibold text-red-900">Failed Txns</p>
                  <p className="text-xl font-bold text-red-900 mt-1">₹</p>
                </div>
              </div>
              <p className="relative text-gray-700 font-medium">0 Txns</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Pay In</h3>
            <p className="font-medium text-gray-600 mb-2">Pay In Weekly Report</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Amount (₹)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
function PayOutDashboard() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Pay Out</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-blue-200 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15)_0%,transparent_70%)]"></div>
            <div className="relative flex items-center gap-3">
              <CheckCircle className="text-blue-600" size={26} />
              <div>
                <p className="font-semibold text-blue-900">Success Txns</p>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  ₹3,86,69,990
                </p>
              </div>
            </div>
            <p className="relative text-gray-700 font-medium">7646 Txns</p>
          </div>
          <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-yellow-200 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.2)_0%,transparent_70%)]"></div>
            <div className="relative flex items-center gap-3">
              <Clock className="text-yellow-700" size={26} />
              <div>
                <p className="font-semibold text-yellow-900">Pending Txns</p>
                <p className="text-xl font-bold text-yellow-900 mt-1">
                  ₹6,25,53,270
                </p>
              </div>
            </div>
            <p className="relative text-gray-700 font-medium">2377 Txns</p>
          </div>
          <div className="relative flex justify-between items-center rounded-xl p-5 overflow-hidden border border-red-200 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.2)_0%,transparent_70%)]"></div>
            <div className="relative flex items-center gap-3">
              <ShieldX className="text-red-600" size={26} />
              <div>
                <p className="font-semibold text-red-900">Failed Txns</p>
                <p className="text-xl font-bold text-red-900 mt-1">₹1,08,470</p>
              </div>
            </div>
            <p className="relative text-gray-700 font-medium">5411 Txns</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Pay Out</h3>
          <p className="font-medium text-gray-600 mb-2">Pay Out Weekly Report</p>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Amount (₹)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}