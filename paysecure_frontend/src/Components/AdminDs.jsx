import React, { useState } from "react";

export default function AccountSection() {
  const [activeTab, setActiveTab] = useState("account");
  const [accountSubTab, setAccountSubTab] = useState("add");
  const [userSubTab, setUserSubTab] = useState("withdraw");

  const [walletBalance, setWalletBalance] = useState(25000);
  const [showMore, setShowMore] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "1234567890",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
      upiId: "john@upi",
    },
  ]);

  const [transactionHistory, setTransactionHistory] = useState([
    {
      id: 1,
      type: "Pay-in",
      upi: "user@upi",
      reqId: "",
      transactionId: "TXN123456",
      date: "2025-09-22",
      time: "14:30",
      fromName: "John Doe",
      fromFranchise: "Franchise A",
      fromAccountn: "1235423",
      frombankname: "SBI",
      toName: "Jane Smith",
      toFranchise: "Franchise B",
      toAccountn: "123512",
      toBankn: "SBI",
      amount: 5000,
      utrNumber: "",
      statusResult: "",
    },
    {
      id: 2,
      type: "Pay-out",
      upi: "recipient@upi",
      reqId: "",
      transactionId: "TXN654321",
      date: "2025-09-20",
      time: "10:15",
      fromName: "John Doe",
      fromFranchise: "Franchise A",
      fromAccountn: "1235423",
      frombankname: "SBI",
      toName: "Jane Smith",
      toFranchise: "Franchise B",
      toAccountn: "123512",
      toBankn: "SBI",
      amount: 2000,
      utrNumber: "",
      statusResult: "",
    },
  ]);
  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      id: 1,
      accountName: "John Doe",
      bankName: "HDFC Bank",
      upiId: "john@upi",
      amount: 5000,
      date: "2025-09-25",
      time: "10:30 AM",
      status: "Pending",
    },
  ]);

  const [depositRequests, setDepositRequests] = useState([
    {
      id: 1,
      accountName: "Jane Smith",
      bankName: "SBI Bank",
      accountNumber: "9876543210",
      ifsc: "SBIN0005678",
      upiId: "jane@upi",
      qr: "https://via.placeholder.com/80",
      amount: 3000,
      date: "2025-09-25",
      time: "11:45 AM",
      status: "Pending",
    },
  ]);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [assignPayoutRequests, setAssignPayoutRequests] = useState([
    {
      id: 1,
      franchiseName: "Franchise A",
      accountNumber: "1234567890",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
      amount: 5000,
      upiId: "franchise@upi",
      reqId: "REQ1001",
      date: "2025-09-26",
      time: "10:45 AM",
      status: "Pending",
    },
  ]);
  const handleAddAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAcc = {
      id: accounts.length + 1,
      accountName: formData.get("accountName"),
      accountNumber: formData.get("accountNumber"),
      bankName: formData.get("bankName"),
      ifsc: formData.get("ifsc"),
      upiId: formData.get("upiId"),
    };
    setAccounts((prev) => [...prev, newAcc]);
    e.target.reset();
    setAccountSubTab("history");
  };

  const handleStatusChange = (type, id, status) => {
    if (type === "withdraw") {
      setWithdrawRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: status } : req
        )
      );
      if (status === "Accepted") {
        setWalletBalance((prev) => prev - 5000);
        setTransactionHistory((prev) => [
          ...prev,
          { id: Date.now(), type: "Withdraw", amount: 5000, status },
        ]);
      }
    }

    if (type === "deposit") {
      const depositReq = depositRequests.find((req) => req.id === id);
      setDepositRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: status } : req
        )
      );
      if (status === "Accepted" && depositReq) {
        setWalletBalance((prev) => prev + depositReq.amount);
        setTransactionHistory((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "Deposit",
            amount: depositReq.amount,
            status,
          },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center bg-white shadow-sm p-3">
        <div className="flex space-x-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === "account"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab("account")}
          >
            Franchise
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab("users")}
          >
            User
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === "profile"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab("profile")}
          >
            History
          </button>
        </div>
      </div>
      <main className="flex-1 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          {activeTab === "account" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Franchise
              </h1>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${accountSubTab === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("add")}
                >
                  Account
                </button>

                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${accountSubTab === "history"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("history")}
                >
                  History
                </button>

                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${accountSubTab === "wallet"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("wallet")}
                >
                  Wallet
                </button>

                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${accountSubTab === "assignPayout"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setAccountSubTab("assignPayout")}
                >
                  Assign Pay-Out Request
                </button>
              </div>
              {accountSubTab === "add" && (
                <div className="flex flex-col items-center justify-start min-h-[70vh] p-6 mt-10">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-8"
                    onClick={() => setShowAccounts(!showAccounts)}
                  >
                    Franchise Name
                  </button>
                  {showAccounts && (
                    <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold mb-4 text-center">All Accounts</h2>
                      <ul className="space-y-4">
                        {accounts.map((account) => (
                          <li
                            key={account.id}
                            className="p-4 bg-white rounded-lg shadow-sm"
                          >
                            <div className="flex flex-col space-y-2">
                              <span className="font-medium">Account Holder: {account.accountHolderName}</span>
                              <span>Account Number: {account.accountNumber}</span>
                              <span>IFSC Code: {account.ifscCode}</span>
                              <span>UPI ID: {account.upiId}</span>
                              {account.qrCode && (
                                <img
                                  src={account.qrCode}
                                  alt="QR Code"
                                  className="w-24 h-24 object-contain mt-2 border rounded self-center"
                                />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {accountSubTab === "history" && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4">Account History</h2>
                  <table className="min-w-full border border-gray-300 text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr>
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
                      {assignPayoutRequests.map((req, index) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{req.franchiseName}</td>
                          <td className="border px-4 py-2">{req.accountHolder || "-"}</td>
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
              {accountSubTab === "wallet" && (
                <div>
                  <h2 className="text-lg font-bold mb-4">Wallet</h2>

                  <div className="p-4 border rounded-lg bg-gray-50 mb-4">
                    <p className="text-gray-700 font-semibold">
                      Balance: ₹{walletBalance.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      Last Transaction:{" "}
                      {transactionHistory.length > 0
                        ? `${transactionHistory[transactionHistory.length - 1].type} ₹${transactionHistory[transactionHistory.length - 1].amount}`
                        : "No transactions yet"}
                    </p>
                    <button
                      onClick={() => setShowWalletDetails((prev) => !prev)}
                      className="mt-2 w-full sm:w-auto bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      {showWalletDetails ? "Hide Details" : "View More"}
                    </button>
                    {showWalletDetails && (
                      <div className="mt-3 p-3 border rounded-lg bg-white text-gray-700 text-sm">
                        <h3 className="font-semibold mb-2">Wallet Details</h3>
                        <ul className="list-disc list-inside">
                          {transactionHistory.map((txn, idx) => (
                            <li key={idx}>
                              {txn.type} - ₹{txn.amount} ({txn.date})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {showWalletDetails && (
                    <div className="overflow-x-auto border rounded-lg bg-white p-4">
                      {transactionHistory.length > 0 ? (
                        <table className="min-w-full border-collapse border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border px-4 py-2">Date</th>
                              <th className="border px-4 py-2">Time</th>
                              <th className="border px-4 py-2">Amount</th>
                              <th className="border px-4 py-2">Balance</th>
                              <th className="border px-4 py-2">Bank Holder</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionHistory.map((txn, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{txn.date}</td>
                                <td className="border px-4 py-2">{txn.time}</td>
                                <td className="border px-4 py-2">₹{txn.amount.toLocaleString()}</td>
                                <td className="border px-4 py-2">₹{txn.balance.toLocaleString()}</td>
                                <td className="border px-4 py-2">{txn.accountName}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-gray-600">No transactions yet</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              {accountSubTab === "assignPayout" && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4">Assigned Pay-Out Requests</h2>
                  <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Franchise Name</th>
                        <th className="border px-4 py-2">Account Number</th>
                        <th className="border px-4 py-2">Bank Name</th>
                        <th className="border px-4 py-2">IFSC</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">UPI ID</th>
                        <th className="border px-4 py-2">Req. ID</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignPayoutRequests.map((req, index) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{req.franchiseName}</td>
                          <td className="border px-4 py-2">{req.accountNumber}</td>
                          <td className="border px-4 py-2">{req.bankName}</td>
                          <td className="border px-4 py-2">{req.ifsc}</td>
                          <td className="border px-4 py-2">₹{req.amount.toLocaleString()}</td>
                          <td className="border px-4 py-2">{req.upiId}</td>
                          <td className="border px-4 py-2">{req.reqId}</td>
                          <td className="border px-4 py-2">{req.date}</td>
                          <td className="border px-4 py-2">{req.time}</td>
                          <td className="border px-4 py-2">{req.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">User</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${userSubTab === "withdraw"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setUserSubTab("withdraw")}
                >
                  Withdraw Requests
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${userSubTab === "deposit"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setUserSubTab("deposit")}
                >
                  Deposit Requests
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${userSubTab === "wallet"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setUserSubTab("wallet")}
                >
                  Wallet
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${userSubTab === "history"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setUserSubTab("history")}
                >
                  History
                </button>
              </div>
              {userSubTab === "withdraw" && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4">Withdraw Requests</h2>
                  <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Holder</th>
                        <th className="border px-4 py-2">Bank</th>
                        <th className="border px-4 py-2">UPI</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawRequests.map((req, index) => {
                        const isAccepted = req.status === "Accepted";
                        const isRejected = req.status === "Rejected";

                        return (
                          <tr key={req.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{req.accountName}</td>
                            <td className="border px-4 py-2">{req.bankName}</td>
                            <td className="border px-4 py-2">{req.upiId}</td>
                            <td className="border px-4 py-2">₹{req.amount.toLocaleString()}</td>
                            <td className="border px-4 py-2">{req.date}</td>
                            <td className="border px-4 py-2">{req.time}</td>
                            <td className="border px-4 py-2">{req.status}</td>
                            <td className="border px-4 py-2 text-center">
                              {!isAccepted && !isRejected && (
                                <div className="flex justify-center items-center gap-2 flex-nowrap">
                                  <button
                                    onClick={() =>
                                      handleStatusChange("withdraw", req.id, "Accepted")
                                    }
                                    className="bg-green-600 text-white px-2 py-1 md:px-3 rounded-lg hover:bg-green-700 text-sm"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleStatusChange("withdraw", req.id, "Rejected")
                                    }
                                    className="bg-red-600 text-white px-2 py-1 md:px-3 rounded-lg hover:bg-red-700 text-sm"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                              {isAccepted && (
                                <button
                                  onClick={() => handleAssign(req.id)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                                >
                                  Assign
                                </button>
                              )}
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {userSubTab === "deposit" && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4">Deposit Requests</h2>
                  <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Holder</th>
                        <th className="border px-4 py-2">Bank</th>
                        <th className="border px-4 py-2">Account No</th>
                        <th className="border px-4 py-2">IFSC</th>
                        <th className="border px-4 py-2">UPI</th>
                        <th className="border px-4 py-2">QR</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositRequests.map((req, index) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{req.accountName}</td>
                          <td className="border px-4 py-2">{req.bankName}</td>
                          <td className="border px-4 py-2">{req.accountNumber}</td>
                          <td className="border px-4 py-2">{req.ifsc}</td>
                          <td className="border px-4 py-2">{req.upiId}</td>
                          <td className="border px-4 py-2 text-center">
                            <img src={req.qr} alt="QR" className="w-16 h-16 mx-auto" />
                          </td>
                          <td className="border px-4 py-2">₹{req.amount.toLocaleString()}</td>
                          <td className="border px-4 py-2">{req.date}</td>
                          <td className="border px-4 py-2">{req.time}</td>
                          <td className="border px-4 py-2">{req.status}</td>
                          <td className="border px-4 py-2 text-center">
                            {req.status === "Pending" && (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() =>
                                    handleStatusChange("deposit", req.id, "Accepted")
                                  }
                                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange("deposit", req.id, "Rejected")
                                  }
                                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                                >
                                  Reject
                                </button>
                              </div>
                            )}

                            {req.status === "Accepted" && !req.showAssign && (
                              <button
                                onClick={() => handleAssign(req.id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                              >
                                Assign
                              </button>
                            )}
                            {req.showAssign && (
                              <div className="mt-2 space-y-2">
                                <h3 className="font-semibold">Select Franchise:</h3>
                                {franchises.map((fr) => (
                                  <div
                                    key={fr.id}
                                    className="border rounded-lg p-2 flex justify-between items-center"
                                  >
                                    <div>
                                      <p className="font-medium">{fr.name}</p>
                                      <p className="text-sm text-gray-600">
                                        Balance: ₹{fr.balance.toLocaleString()} | Limit: ₹
                                        {fr.limit.toLocaleString()}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => handleSendDetails(req.id, fr.id)}
                                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                                    >
                                      Send Bank & QR
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {userSubTab === "wallet" && (
                <div>
                  <h2 className="text-lg font-bold mb-4">Wallet</h2>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Bank Name:</span> HDFC Bank
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Balance:</span> ₹
                      {walletBalance.toLocaleString()}
                    </p>
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {showMore ? "Hide Details" : "View More"}
                    </button>
                    {showMore && (
                      <div className="mt-4 space-y-2 bg-white border rounded-lg p-4 shadow">
                        <p className="text-gray-700">
                          <span className="font-medium">Date:</span> 2025-09-26
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Time:</span> 11:45 AM
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Amount:</span> ₹15,000
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Bank Holder Name:</span>{" "}
                          John Doe
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Balance:</span> ₹
                          {walletBalance.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {userSubTab === "history" && (
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
                      {transactionHistory.map((tx, index) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{tx.type}</td>
                          <td className="border px-4 py-2">{tx.reqId || "-"}</td>
                          <td className="border px-4 py-2">{tx.transactionId}</td>
                          <td className="border px-4 py-2">{tx.upi}</td>
                          <td className="border px-4 py-2">{tx.date}</td>
                          <td className="border px-4 py-2">{tx.time}</td>
                          <td className="border px-4 py-2">
                            <table className="min-w-full border-collapse border border-gray-200">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border px-2 py-1 text-left text-xs">Name</th>
                                  <th className="border px-2 py-1 text-left text-xs">Bank</th>
                                  <th className="border px-2 py-1 text-left text-xs">Account</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border px-2 py-1 text-xs">{tx.fromName}</td>
                                  <td className="border px-2 py-1 text-xs">{tx.frombankname}</td>
                                  <td className="border px-2 py-1 text-xs">{tx.fromAccountn}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td className="border px-4 py-2">
                            <table className="min-w-full border-collapse border border-gray-200">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border px-2 py-1 text-left text-xs">Bank</th>
                                  <th className="border px-2 py-1 text-left text-xs">Account</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border px-2 py-1 text-xs">{tx.toBankn}</td>
                                  <td className="border px-2 py-1 text-xs">{tx.toAccountn}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>

                          <td className="border px-4 py-2">₹{tx.amount.toLocaleString()}</td>
                          <td className="border px-4 py-2">{tx.utrNumber || "-"}</td>
                          <td className={`border px-4 py-2 font-semibold ${tx.statusResult === "Successful"
                            ? "text-green-600"
                            : tx.statusResult === "Failed"
                              ? "text-red-600"
                              : "text-gray-600"
                            }`}>
                            {tx.statusResult || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}
          {activeTab === "profile" && (
            <div className="overflow-x-auto mt-4">
              <h2 className="text-lg font-bold mb-4">Transaction History</h2>
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Transaction Id</th>
                    <th className="border px-4 py-2">Req Id</th>
                    <th className="border px-4 py-2">From</th>
                    <th className="border px-4 py-2">To</th>
                    <th className="border px-4 py-2">UTR</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((tx, index) => (
                    <tr key={tx.id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{tx.transactionId}</td>
                      <td className="border px-4 py-2">{tx.reqId || "-"}</td>
                      <td className="border px-4 py-2 p-0">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-2 py-1 text-left text-xs">Franchise Name</th>
                              <th className="border px-2 py-1 text-left text-xs">User Name</th>
                              <th className="border px-2 py-1 text-left text-xs">Bank</th>
                              <th className="border px-2 py-1 text-left text-xs">Account Number</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border px-2 py-1 text-xs">{tx.fromFranchise || "-"}</td>
                              <td className="border px-2 py-1 text-xs">{tx.fromName}</td>
                              <td className="border px-2 py-1 text-xs">{tx.frombankname}</td>
                              <td className="border px-2 py-1 text-xs">{tx.fromAccountn}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td className="border px-4 py-2 p-0">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-2 py-1 text-left text-xs">Franchise Name</th>
                              <th className="border px-2 py-1 text-left text-xs">User Name</th>
                              <th className="border px-2 py-1 text-left text-xs">Bank</th>
                              <th className="border px-2 py-1 text-left text-xs">Account Number</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border px-2 py-1 text-xs">{tx.toFranchise || "-"}</td>
                              <td className="border px-2 py-1 text-xs">{tx.toName || "-"}</td>
                              <td className="border px-2 py-1 text-xs">{tx.toBankn}</td>
                              <td className="border px-2 py-1 text-xs">{tx.toAccountn}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>

                      <td className="border px-4 py-2">{tx.utrNumber || "-"}</td>
                      <td className={`border px-4 py-2 font-semibold ${tx.statusResult === "Successful" ? "text-green-600" :
                        tx.statusResult === "Failed" ? "text-red-600" : "text-yellow-600"
                        }`}>
                        {tx.statusResult || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}