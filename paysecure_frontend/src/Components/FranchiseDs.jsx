import React, { useState } from "react";
<<<<<<< HEAD
import { User, CreditCard, ArrowUpCircle, Clock } from "lucide-react";
=======
import { User, CreditCard, Clock } from "lucide-react";
import payImg from "../assets/reverse.png";

>>>>>>> c5ff5efe6c96b54742c29593c8e86a50ae875395

export default function FranchiseDs() {
  const [accountSubTab, setAccountSubTab] = useState("view");
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("complete");
  
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [utrInput, setUtrInput] = useState("");
  const [amountInput, setamountInput] = useState("");

  // All transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Pay-in",
      upi: "user@upi",
      transactionId: "TXN123456",
      reqId:"",
      date: "2025-09-22",
      time: "14:30",
      fromName: "John Doe",
      fromAccountn:"1235423",
      frombankname:"SBI",
      toAccountn: "123512",
      toBankn:"SBI",
      amount: 5000,
      statusResult: "", // Initially empty
      utrNumber: "",
    },
    {
      id: 2,
      type: "Pay-out",
      upi: "recipient@upi",
      transactionId: "TXN654321",
      reqId:"",
      date: "2025-09-20",
      time: "10:15",
       fromName: "John Doe",
      fromAccountn:"1235423",
      frombankname:"SBI",
      toAccountn: "123512",
      toBankn:"SBI",
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
      ReqId:"",
      TnxId:"",
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
      ReqId:"",
      TnxId:"",
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
            ? { ...tx, utrNumber: utrInput,amountInput: amountInput, statusResult: "Successful" }
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
<<<<<<< HEAD
=======
        {/* Center Tabs */}
>>>>>>> c5ff5efe6c96b54742c29593c8e86a50ae875395
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
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
      <button
        className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "view"
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        onClick={() => setAccountSubTab("view")}
      >
        View
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-medium ${accountSubTab === "add"
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        onClick={() => setAccountSubTab("add")}
      >
        Add Account
      </button>
    </div>

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
                        target: { name: "QrCode", value: URL.createObjectURL(e.target.files[0]) }
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
<<<<<<< HEAD
                        <th className="border px-4 py-2">#</th>
=======
                        <th className="border px-4 py-2">Image</th>

>>>>>>> c5ff5efe6c96b54742c29593c8e86a50ae875395
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
                          
<<<<<<< HEAD
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
=======
                         <td className="border px-4 py-2 text-center">
  <img src={payImg} alt="Pay" className="w-8 h-8 mx-auto" />
</td>

>>>>>>> c5ff5efe6c96b54742c29593c8e86a50ae875395
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
<<<<<<< HEAD

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
=======
              {historyTab === "complete" && (
                <div className="bg-white p-6 rounded-lg shadow w-full overflow-x-auto">
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
>>>>>>> c5ff5efe6c96b54742c29593c8e86a50ae875395
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
      ToAccountnumber:"Account number:123456789",
      ToBankname :"Bank name-SBI",
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
      ToAccountnumber:"Account number:123452789",
      ToBankname :"Bank name-HDFC",
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
            ? { ...tx, utrNumber: utrInput,amountInput: amountInput, statusResult: "Successful" }
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
