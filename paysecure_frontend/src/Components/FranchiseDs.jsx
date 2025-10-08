import React, { useState } from "react";
import { User, Clock, ArrowUpCircle, CreditCard, LayoutDashboard, CheckCircle, ShieldX  } from "lucide-react";
<<<<<<< HEAD

import React, { useState, useEffect } from "react";
import api from "../api/axios"
=======
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", amount: 0 },
  { name: "Tue", amount: 0 },
  { name: "Wed", amount: 0 },
  { name: "Thu", amount: 0 },
  { name: "Fri", amount: 0 },
  { name: "Sat", amount: 0 },
  { name: "Sun", amount: 0 },
];
<<<<<<< HEAD

=======
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899

export default function FranchiseDs() {
  const [accountSubTab, setAccountSubTab] = useState("view");
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("complete");

  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [amountInput, setamountInput] = useState("");

<<<<<<< HEAD
  // All transactions     
  // const [transactions, setTransactions] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [accounts, setAccounts] = useState([]);

=======
  // All transactions
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Pay-in",
      upi: "user@upi",
      transactionId: "TXN123456",
      reqId: "",
      date: "2025-09-22",
      time: "14:30",
      fromName: "John Doe",
      fromAccountn: "1235423",
      frombankname: "SBI",
      toAccountn: "123512",
      toBankn: "SBI",
      amount: 5000,
      statusResult: "", // Initially empty
      utrNumber: "",
    },
    {
      id: 2,
      type: "Pay-out",
      upi: "recipient@upi",
      transactionId: "TXN654321",
      reqId: "",
      date: "2025-09-20",
      time: "10:15",
      fromName: "John Doe",
      fromAccountn: "1235423",
      frombankname: "SBI",
      toAccountn: "123512",
      toBankn: "SBI",
      amount: 2000,
      statusResult: "",
      utrNumber: "",
    },
  ]);



  const withdrawRequests = [
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "123456789012",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
      ReqId: "",
      TnxId: "",
      upiId: "john@upi",
      amount: 5000,
      date: "2025-09-22",
      time: "10:45 AM",
      qr: "https://via.placeholder.com/100x100.png?text=QR1",
    },
    {
      id: 2,
      accountName: "Jane Smith",
      accountNumber: "987654321098",
      bankName: "HDFC Bank",
      ifsc: "HDFC0005678",
      ReqId: "",
      TnxId: "",
      upiId: "jane@upi",
      amount: 3000,
      date: "2025-09-21",
      time: "03:20 PM",
      qr: "https://via.placeholder.com/100x100.png?text=QR2",
    },
  ];

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "123456789012",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
      upiId: "SBI@upi",
      QrCode: "",
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    upiId: "",
    QrCode: "",
  });

  const handleNewChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId }]);
    setNewAccount({
      accountName: "",
      accountNumber: "",
      bankName: "",
      ifsc: "",
      upiId: "",
      QrCode: "",
    });
    setAccountSubTab("view");
  };

<<<<<<< HEAD

    try {
      const res = await api.post("/bank-accounts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAccounts([...accounts, res.data]);
      setAccountSubTab("view");
    } catch (err) {
      console.error("Error adding account", err);

=======
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
  const handleEditChange = (id, e) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, [e.target.name]: e.target.value } : acc
    );
    setAccounts(updatedAccounts);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTx) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === selectedTx.id
            ? { ...tx, utrNumber: utrInput, amountInput: amountInput, statusResult: "Successful" }
            : tx
        )
      );
      setShowModal(false);
      setUtrInput("");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Center Tabs */}
      <header className="bg-white shadow-md px-4 md:px-8 py-3 flex items-center justify-center">
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
       <button
  onClick={() => setActiveTab("dashboard")}
  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${
    activeTab === "dashboard"
      ? "bg-blue-600 text-white shadow"
      : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
  }`}
>
  <LayoutDashboard size={18} className="mr-2" /> Dashboard
</button>

          <button
            onClick={() => setActiveTab("account")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "account"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            <CreditCard size={18} className="mr-2" />
            Account
          </button>




          {/* Pay-In Button */}
          <button
            onClick={() => setActiveTab("payin")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "payin"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            <CreditCard size={18} className="mr-2" />
            Pay-In
          </button>

          {/* Pay-Out Button */}
          <button
            onClick={() => setActiveTab("payout")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "payout"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            <ArrowUpCircle size={18} className="mr-2" />
            Pay-Out
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "history"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            <Clock size={18} className="mr-2" />
            History
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "profile"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            <User size={18} className="mr-2" />
            Profile
          </button>
        </nav>
      </header>


      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-5xl">
          {/* Account Section */}
          {activeTab === "account" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Bank Accounts</h1>

              {/* Subtabs */}
              <div className="flex flex-wrap gap-2 mb-6">
<<<<<<< HEAD

=======
                {/* View Button */}
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "view"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("view")}
                >
                  View
                </button>
<<<<<<< HEAD
=======

                {/* Add Account Button */}
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("add")}
                >
                  Add Account
                </button>

<<<<<<< HEAD
              {/* View Accounts */}
              {accountSubTab === "view" && (
                <div className="space-y-6">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="font-semibold">{acc.accountName}</h2>
                          <button
                            onClick={() =>
                              editingId === acc.id ? setEditingId(null) : setEditingId(acc.id)
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                          >
                            {editingId === acc.id ? "Save" : "Edit"}
                          </button>
                        </div>
                </button>
=======
                {/* Activate Button */}
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "activate"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("activate")}
                >
                  Activated Account
                </button>

                {/* Deactivate Button */}
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "deactivate"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("deactivate")}
                >
                  Deactivated Account
                </button>

                {/* Delete Button */}
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "delete"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("delete")}
                >
                  Deleted Account
                </button>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899


              {/* View Accounts */}
                                    {activeTab === "dashboard" && (
  <>
    <PayInDashboard />
    <PayOutDashboard />
  </>
)}
<<<<<<< HEAD
=======
>>>>>>> 13c14ef5331a0003345bb2dada49c9b29b83e60f
=======
>>>>>>> 3269bdb34354c109422e1c7a1baccc054dc2c899
              {accountSubTab === "view" && (
                <div className="space-y-6">
                  {accounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="font-semibold">{acc.accountName}</h2>
                          <div className="flex gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() =>
                                editingId === acc.id ? setEditingId(null) : setEditingId(acc.id)
                              }
                              className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                            >
                              {editingId === acc.id ? "Save" : "Edit"}
                            </button>

                            {/* Activate Button */}
                            <button
                              onClick={() => handleActivate(acc.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-lg"
                            >
                              Activate
                            </button>

                            {/* Deactivate Button */}
                            <button
                              onClick={() => handleDeactivate(acc.id)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                            >
                              Deactivate
                            </button>
                          </div>
                        </div>

                        <p>
                          <span className="font-semibold">Account Number:</span>{" "}
                          {editingId === acc.id ? (
                            <input
                              type="text"
                              name="accountNumber"
                              value={acc.accountNumber}
                              onChange={(e) => handleEditChange(acc.id, e)}
                              className="px-2 py-1 border rounded w-full"
                            />
                          ) : (
                            acc.accountNumber
                          )}
                        </p>
                        <p>
                          <span className="font-semibold">Bank:</span>{" "}
                          {editingId === acc.id ? (
                            <input
                              type="text"
                              name="bankName"
                              value={acc.bankName}
                              onChange={(e) => handleEditChange(acc.id, e)}
                              className="px-2 py-1 border rounded w-full"
                            />
                          ) : (
                            acc.bankName
                          )}
                        </p>
                        <p>
                          <span className="font-semibold">IFSC:</span>{" "}
                          {editingId === acc.id ? (
                            <input
                              type="text"
                              name="ifsc"
                              value={acc.ifsc}
                              onChange={(e) => handleEditChange(acc.id, e)}
                              className="px-2 py-1 border rounded w-full"
                            />
                          ) : (
                            acc.ifsc
                          )}
                        </p>
                        <p>
                          <span className="font-semibold">UPI ID:</span>{" "}
                          {editingId === acc.id ? (
                            <input
                              type="text"
                              name="upiId"
                              value={acc.upiId || ""}
                              onChange={(e) => handleEditChange(acc.id, e)}
                              className="px-2 py-1 border rounded w-full"
                            />
                          ) : (
                            acc.upiId || "Not Added"
                          )}
                        </p>

                        {/* QR Code */}
                        <p className="mt-2">
                          <span className="font-semibold">QR Code:</span>{" "}
                          {editingId === acc.id ? (
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleEditChange(acc.id, {
                                  target: {
                                    name: "QrCode",
                                    value: URL.createObjectURL(e.target.files[0]),
                                  },
                                })
                              }
                              className="mt-1"
                            />
                          ) : acc.QrCode ? (
                            <img src={acc.QrCode} alt="QR Code" className="h-24 w-24 mt-2" />
                          ) : (
                            "Not Added"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}


              {/* Add Account Form */}
              {accountSubTab === "add" && (
                <form className="space-y-4 max-w-lg" onSubmit={handleAddAccount}>
                  <div>
                    <label className="block text-gray-700">Account Name</label>
                    <input
                      type="text"
                      name="accountName"
                      value={newAccount.accountName}
                      onChange={handleNewChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={newAccount.accountNumber}
                      onChange={handleNewChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={newAccount.bankName}
                      onChange={handleNewChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">IFSC</label>
                    <input
                      type="text"
                      name="ifsc"
                      value={newAccount.ifsc}
                      onChange={handleNewChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={newAccount.upiId}
                      onChange={handleNewChange}
                      placeholder="example@upi"
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">QR Code</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          QrCode: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add Account
                  </button>
                </form>
              )}
            </div>
          )}
          {/* ✅ Pay-In Section */}
          {activeTab === "payout" && <PayoutTable />}

          {activeTab === "payin" && (
            <div className="overflow-x-auto">
              <h1 className="text-2xl font-bold mb-6 text-center">Pay-in Transactions</h1>
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Account Holder</th>
                    <th className="border px-4 py-2">Account Number</th>
                    <th className="border px-4 py-2">Bank Name</th>
                    <th className="border px-4 py-2">Req. Id</th>
                    <th className="border px-4 py-2">Tnx. Id</th>
                    <th className="border px-4 py-2">IFSC</th>
                    <th className="border px-4 py-2">UPI ID</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Time</th>
                    <th className="border px-4 py-2">QR Code</th>
                    <th className="border px-4 py-2">Action</th>
                    <th className="border px-4 py-2">#</th>

                  </tr>
                </thead>
                <tbody>
                  {withdrawRequests.map((req, index) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{req.accountName}</td>
                      <td className="border px-4 py-2">{req.accountNumber}</td>
                      <td className="border px-4 py-2">{req.bankName}</td>
                      <td className="border px-4 py-2">{req.ReqId}</td>
                      <td className="border px-4 py-2">{req.TnxId}</td>
                      <td className="border px-4 py-2">{req.ifsc}</td>
                      <td className="border px-4 py-2">{req.upiId}</td>
                      <td className="border px-4 py-2">
                        ₹{req.amount.toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">{req.date}</td>
                      <td className="border px-4 py-2">{req.time}</td>
                      <td className="border px-4 py-2 text-center">
                        <a
                          href={req.qr}
                          download={`QR-${req.id}.png`}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Download
                        </a>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700">
                          Pay Now
                        </button>
                      </td>

                      <td
                        className="border px-4 py-2 text-center cursor-pointer"
                        title="Click to add UTR number"
                        onClick={() => {
                          setSelectedTx(req);
                          setShowModal(true);
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
          )}


          {/* History Section */}
          {activeTab === "history" && (
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
              <h1 className="text-2xl font-bold mb-6">Completed Transactions</h1>

              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">#</th>
                    <th className="border px-4 py-2 text-left">Type</th>
                    <th className="border px-4 py-2 text-left">Req. ID</th>
                    <th className="border px-4 py-2 text-left">Transaction ID</th>
                    <th className="border px-4 py-2 text-left">UPI ID</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Time</th>
                    <th className="border px-4 py-2 text-left">From</th>
                    <th className="border px-4 py-2 text-left">To</th>
                    <th className="border px-4 py-2 text-left">Amount</th>
                    <th className="border px-4 py-2 text-left">UTR</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{tx.type}</td>
                      <td className="border px-4 py-2">{tx.reqId}</td>
                      <td className="border px-4 py-2">{tx.transactionId}</td>
                      <td className="border px-4 py-2">{tx.upi}</td>
                      <td className="border px-4 py-2">{tx.date}</td>
                      <td className="border px-4 py-2">{tx.time}</td>
                      <td className="border px-4 py-2">
                        <table>
                          <thead>
                            <th className="border px-4 py-2 text-center">Name</th>
                            <th className="border px-4 py-2 text-center">Bank name</th>
                            <th className="border px-4 py-2 text-center">Account number</th>
                          </thead>
                          <tbody>
                            <td className="border px-4 py-2">{tx.fromName}</td>
                            <td className="border px-4 py-2">{tx.frombankname}</td>
                            <td className="border px-4 py-2">{tx.fromAccountn}</td>
                          </tbody>
                        </table>
                      </td>
                      <td className="border px-4 py-2">
                        <table>
                          <thead>
                            <th className="border px-4 py-2 text-center">Bank name</th>
                            <th className="border px-4 py-2 text-center">Account number</th>
                          </thead>
                          <tbody>
                            <td className="border px-4 py-2">{tx.toBankn}</td>
                            <td className="border px-4 py-2">{tx.toAccountn}</td>
                          </tbody>
                        </table>
                      </td>
                      <td className="border px-4 py-2">₹{tx.amount.toLocaleString()}</td>
                      <td className="border px-4 py-2">{tx.utrNumber || "-"}</td>
                      <td className={`border px-4 py-2 font-semibold ${tx.statusResult === "Successful" ? "text-green-600" : tx.statusResult === "Failed" ? "text-red-600" : "text-gray-600"}`}>
                        {tx.statusResult || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>
          )}

          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shadow">
                  <User size={48} className="text-gray-600" />
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    defaultValue="johndoe@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
function PayoutTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [amountInput, setamountInput] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Pay-in",
      redid: "REQ001",
      transactionId: "TXN123456",
      upi: "user@upi",
      date: "2025-09-22",
      time: "14:30",
      fromName: "John Doe",
      accountNumber: "Account number-123456789012",
      bankName: "Bank name-SBI",
      ToAccountnumber: "Account number:123456789",
      ToBankname: "Bank name-SBI",
      amount: 5000,
      statusResult: "",
      utrNumber: "",
    },
    {
      id: 2,
      type: "Pay-out",
      redid: "REQ002",
      transactionId: "TXN654321",
      upi: "recipient@upi",
      date: "2025-09-20",
      time: "10:15",
      fromName: "Bank Account",
      accountNumber: "Account number-987654321098",
      bankName: "Bank name-HDFC",
      ToAccountnumber: "Account number:123452789",
      ToBankname: "Bank name-HDFC",
      amount: 2000,
      statusResult: "",
      utrNumber: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTx) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === selectedTx.id
            ? { ...tx, utrNumber: utrInput, amountInput: amountInput, statusResult: "Successful" }
            : tx
        )
      );
      setShowModal(false);
      setUtrInput("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Pay-Out Transactions</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">#</th>
            <th className="border px-4 py-2 text-left">Req. ID</th>
            <th className="border px-4 py-2 text-left">Transaction ID</th>
            <th className="border px-4 py-2 text-left">UPI ID</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Time</th>
            <th className="border px-4 py-2 text-left">From</th>
            <th className="border px-4 py-2 text-left">To</th>
            <th className="border px-4 py-2 text-left">Amount</th>
            <th className="border px-4 py-2 text-center">#</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{tx.redid}</td>
              <td className="border px-4 py-2">{tx.transactionId}</td>
              <td className="border px-4 py-2">{tx.upi}</td>
              <td className="border px-4 py-2">{tx.date}</td>
              <td className="border px-4 py-2">{tx.time}</td>

              {/* From column with bank details */}
              <td className="border px-4 py-2">
                <table>
                  <thead>
                    <th className="border px-4 py-2 text-center">Name</th>
                    <th className="border px-4 py-2 text-center">Bank name</th>
                    <th className="border px-4 py-2 text-center">Account number</th>
                  </thead>
                  <tbody>
                    <td className="border px-4 py-2">{tx.fromName}</td>
                    <td className="border px-4 py-2">{tx.accountNumber}</td>
                    <td className="border px-4 py-2">{tx.bankName}</td>
                  </tbody>
                </table>
              </td>
              <td className="border px-4 py-2">
                <table>
                  <thead>
                    <th className="border px-4 py-2 text-center">Bank name</th>
                    <th className="border px-4 py-2 text-center">Account number</th>
                  </thead>
                  <tbody>
                    <td className="border px-4 py-2">{tx.ToBankname}</td>
                    <td className="border px-4 py-2">{tx.ToAccountnumber}</td>
                  </tbody>
                </table>
              </td>


              <td className="border px-4 py-2">₹{tx.amount.toLocaleString()}</td>
              <td
                className="border px-4 py-2 text-center cursor-pointer"
                title="Click to add UTR number"
                onClick={() => {
                  setSelectedTx(tx);
                  setShowModal(true);
                }}
              >
                ↺
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
  );
}
function PayInDashboard() {
  return (
    <>
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Pay In</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Transaction Cards */}
        <div className="flex flex-col gap-4">
          {/* Success Txn */}
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
          {/* Pending Txn */}
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

          {/* Failed Txn */}
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

        {/* Right: Chart */}
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
        {/* Left Side: Cards */}
        <div className="flex flex-col gap-4">
          {/* Success Txn */}
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

          {/* Pending Txn */}
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

          {/* Failed Txn */}
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

        {/* Right Side: Chart */}
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