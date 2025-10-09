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
const data = [
  { name: "Mon", amount: 0 },
  { name: "Tue", amount: 0 },
  { name: "Wed", amount: 0 },
  { name: "Thu", amount: 0 },
  { name: "Fri", amount: 0 },
  { name: "Sat", amount: 0 },
  { name: "Sun", amount: 0 },
];

export default function FranchiseDs() {
  const [accountSubTab, setAccountSubTab] = useState("view");
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("complete");
  const [dashboard, setDashboard] = useState("dashboard");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [available, setAvailable] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [startAmount, setStartAmount] = useState("");
  const [limitAmount, setLimitAmount] = useState("");

  const handleLimitSubmit = (e) => {
    e.preventDefault();
    alert(`Amount limits set:\nStart: ₹${startAmount}\nLimit: ₹${limitAmount}`);
    setShowLimitModal(false);
  };
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
      statusResult: "",
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
  const [paymentData, setPaymentData] = useState([
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
  ]);

  // ✅ Withdraw Requests
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

  // ✅ Accounts
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
            ? {
              ...tx,
              utrNumber: utrInput,
              amountInput: amountInput,
              statusResult: "Successful",
            }
            : tx
        )
      );
      setShowModal(false);
      setUtrInput("");
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    alert("New Pay-Out Record Added!");
    setShowAddModal(false);
  };

  // ✅ Approve / Reject Payment Functions
  const handleApprove = (requestId) => {
    setPaymentData((prev) =>
      prev.map((item) =>
        item.requestId === requestId ? { ...item, status: "Successed" } : item
      )
    );
    alert("✅ Payment approved successfully!");
  };

  const handleReject = (requestId) => {
    setPaymentData((prev) =>
      prev.map((item) =>
        item.requestId === requestId ? { ...item, status: "Failed" } : item
      )
    );
    alert("❌ Payment marked as failed!");
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Center Tabs */}
      <header className="bg-white shadow-md px-4 md:px-8 py-3 flex items-center justify-center">
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base ${activeTab === "dashboard"
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
            onClick={() => setActiveTab("payment")}
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
            onClick={() => setActiveTab("withdraw")}
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
          {activeTab === "dashboard" && (<><PayInDashboard /><PayOutDashboard /></>)}
          {/* Account Section */}

          {activeTab === "account" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Bank Accounts</h1>

              {/* Subtabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {/* View Button */}
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "view"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("view")}
                >
                  View
                </button>

                {/* Add Account Button */}
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("add")}
                >
                  Add Account
                </button>

                {/* Activate Button */}
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


              {/* View Accounts */}

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

          {/* ✅ Payment Section */}
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
                      <th className="border px-4 py-2 text-left">Customer ID</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                      <th className="border px-4 py-2 text-left">#</th>
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
                        <td className="border px-4 py-2">{item.customerId}</td>
                        <td
                          className={`border px-4 py-2 font-medium ${item.status === "Successed"
                            ? "text-green-600"
                            : item.status === "Pending"
                              ? "text-yellow-600"
                              : item.status === "Failed"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                        >
                          {item.status}
                        </td>

                        {/* View Button */}
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleView(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg"
                          >
                            View
                          </button>
                        </td>

                        {/* Manual Update */}
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

                        {/* Approve / Reject */}
                        <td className="border px-4 py-2 text-center">
                          <button
                            onClick={() => handleApprove(item.requestId)}
                            className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full"
                            title="Instant Verify"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleReject(item.requestId)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full ml-2"
                            title="Instant Failed"
                          >
                            ✗
                          </button>
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

        {/* ✅ Available Toggle Button */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Available:</span>
          <button
            onClick={() => {
              const newState = !available;
              setAvailable(newState);
              if (newState) {
                setShowLimitModal(true);
              }
            }}
            className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 ${
              available ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                available ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>

    <br />

    {/* ✅ Table Section */}
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border px-4 py-2 text-left">Date</th>
          <th className="border px-4 py-2 text-left">Request ID</th>
          <th className="border px-4 py-2 text-left">UTR No.</th>
          <th className="border px-4 py-2 text-left">Amount</th>
          <th className="border px-4 py-2 text-left">Customer ID</th>
          <th className="border px-4 py-2 text-left">Status</th>
          <th className="border px-4 py-2 text-left">Action</th>
          <th className="border px-4 py-2 text-left">#</th>
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

            {/* ✅ Action Buttons with logic */}
            <td className="border px-4 py-2 text-center">
              {!item.hideButtons && (
                <>
                  <button
                    onClick={() => {
                      // ✅ When click on green button — hide both buttons for this row
                      const updatedData = [...paymentData];
                      updatedData[index].hideButtons = true;
                      setPaymentData(updatedData);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full"
                    title="Instant Verify"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      // ✅ When click on red button — remove row
                      const updatedData = paymentData.filter((_, i) => i !== index);
                      setPaymentData(updatedData);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full ml-2"
                    title="Instant Failed"
                  >
                    ✗
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* ✅ Payout Request Section (only visible when available is ON) */}
    {available && startAmount && limitAmount && (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Payout Request{" "}
            <span className="text-gray-500">
              ({startAmount} - {limitAmount})
            </span>
          </h2>
          <button
            onClick={() => setShowLimitModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Edit Limit
          </button>
        </div>

        {/* Example Table for Payout Requests */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left">Request ID</th>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">REQ1001</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">₹500</td>
                <td className="border px-4 py-2 text-green-600 font-medium">
                  Success
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">REQ1002</td>
                <td className="border px-4 py-2">Jane Smith</td>
                <td className="border px-4 py-2">₹150</td>
                <td className="border px-4 py-2 text-yellow-600 font-medium">
                  Pending
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* ✅ Set Amount Limits Modal */}
    {showLimitModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4 text-center">
            Set Amount Limits
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                `Amount limits set:\nStart: ₹${startAmount}\nLimit: ₹${limitAmount}`
              );
              setShowLimitModal(false);
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Enter Start Amount
              </label>
              <input
                type="number"
                value={startAmount}
                onChange={(e) => setStartAmount(e.target.value)}
                placeholder="Enter Start Amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Enter Limit Amount
              </label>
              <input
                type="number"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                placeholder="Enter Limit Amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowLimitModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}

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