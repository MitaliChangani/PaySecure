import React, { useState } from "react";
import { User, CreditCard, Clock } from "lucide-react";
import payImg from "../assets/reverse.png";


export default function FranchiseDs() {
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("pending");
  const [accountSubTab, setAccountSubTab] = useState("view");
  const [editingId, setEditingId] = useState(null);

  const withdrawRequests = [
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "123456789012",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ---------- NAVBAR ---------- */}
      <header className="bg-white shadow-md px-4 md:px-8 py-3 flex items-center justify-center">


        {/* Center Tabs */}
        {/* <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <button
            onClick={() => setActiveTab("account")}
            className={`flex items-center px-3 py-1 rounded-lg transition ${activeTab === "account"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
              }`}
          >
            <CreditCard size={18} className="mr-1" />
            Account
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center px-3 py-1 rounded-lg transition ${activeTab === "history"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
              }`}
          >
            <Clock size={18} className="mr-1" />
            History
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-3 py-1 rounded-lg transition ${activeTab === "profile"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
              }`}
          >
            <User size={18} className="mr-1" />
            Profile
          </button>
        </nav> */}

        {/* Center Tabs */}
        {/* Center Tabs */}
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
                    <div key={acc.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="font-semibold">{acc.accountName}</h2>
                        <button
                          onClick={() =>
                            editingId === acc.id
                              ? setEditingId(null)
                              : setEditingId(acc.id)
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
                    </div>
                  ))}
                </div>
              )}

              {/* Add Account Form */}
              {accountSubTab === "add" && (
                <form
                  className="space-y-4 max-w-lg"
                  onSubmit={handleAddAccount}
                >
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

          {/* History Section */}
          {activeTab === "history" && (
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
              <h1 className="text-2xl font-bold mb-6">History</h1>
              {/* History Subtabs */}
              <div className="flex gap-2 mb-6">
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
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Account Holder</th>
                        <th className="border px-4 py-2">Account Number</th>
                        <th className="border px-4 py-2">Bank Name</th>
                        <th className="border px-4 py-2">IFSC</th>
                        <th className="border px-4 py-2">UPI ID</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">QR Code</th>
                        <th className="border px-4 py-2">Action</th>
                        <th className="border px-4 py-2">Image</th>

                      </tr>
                    </thead>
                    <tbody>
                      {withdrawRequests.map((req, index) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{req.accountName}</td>
                          <td className="border px-4 py-2">{req.accountNumber}</td>
                          <td className="border px-4 py-2">{req.bankName}</td>
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
                          
                         <td className="border px-4 py-2 text-center">
  <img src={payImg} alt="Pay" className="w-8 h-8 mx-auto" />
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
