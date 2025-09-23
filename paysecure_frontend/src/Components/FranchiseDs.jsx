import React, { useState } from "react";
import { User, CreditCard, Clock, QrCode } from "lucide-react";
export default function FranchiseDs() {
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("pending");
  const [accountSubTab, setAccountSubTab] = useState("view");
const [editingId, setEditingId] = useState(null);
// Sample Withdraw Requests Data
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


  // Multiple bank accounts
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "123456789012",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
      upiId: "SBI@upi",
      QrCode:"",
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    upiId: "",
    QrCode:"",
  });

  // Handlers
  const handleNewChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId }]);
    setNewAccount({ accountName: "", accountNumber: "", bankName: "", ifsc: "", upiId: "",QrCode:""});
    setAccountSubTab("view");
  };

  const handleEditChange = (id, e) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, [e.target.name]: e.target.value } : acc
    );
    setAccounts(updatedAccounts);
  };

  // Sample bank details
  const userBankDetails = {
    accountName: "John Doe",
    accountNumber: "123456789012",
    bankName: "State Bank of India",
    ifsc: "SBIN0001234",
    upiId: "sbi@upi",
    qrCode:"",
  };

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
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === "account"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <CreditCard size={18} className="mr-2" />
            Account
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Clock size={18} className="mr-2" />
            History
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === "profile"
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
        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Bank Accounts</h1>

            {/* Sub-tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  accountSubTab === "view"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setAccountSubTab("view")}
              >
                View
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  accountSubTab === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setAccountSubTab("add")}
              >
                Add Account
              </button>
            </div>

            {/* View All Accounts */}
            {accountSubTab === "view" && (
              <div className="space-y-6">
                {accounts.map((acc) => (
                  <div key={acc.id} className="border p-4 rounded-lg">
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

<p className="mt-2">
  <span className="font-semibold">QR Code:</span>{" "}
  {editingId === acc.id ? (
    <input
      type="file"
      name="qrCode"
      accept="image/*"
      onChange={(e) => handleEditChange(acc.id, e)}
      className="px-2 py-1 border rounded w-full"
    />
  ) : acc.qrCode ? (
    <img
      src={URL.createObjectURL(acc.rCode)}
      alt="QR Code"
      className="w-20 h-20 mt-2 border rounded"
    />
  ) : (
    "Not Uploaded"
  )}
</p>

                   
                  </div>
                ))}
              </div>
            )}

            {/* Add New Account */}
            {accountSubTab === "add" && (
              <form className="space-y-4 max-w-md" onSubmit={handleAddAccount}>
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
<div className="mt-4">
  <label className="block text-gray-700">Upload QR Code</label>
  <input
    type="file"
    name="qrCode"
    accept="image/*"
    onChange={handleNewChange}
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
        {/* History Tab */}
        {activeTab === "history" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">History</h1>

            {/* Tabs for Pending / Complete */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setHistoryTab("pending")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  historyTab === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setHistoryTab("complete")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  historyTab === "complete"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Complete
              </button>
            </div>

            {/* Pending List */}
          
    {historyTab === "pending" && (
  <div className="bg-white p-6 rounded-lg shadow w-full overflow-x-auto">
    <h2 className="text-xl font-semibold mb-4">Pending Withdraw Requests</h2>
    <table className="min-w-full border-collapse border border-gray-300">
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
            <td className="border px-4 py-2">₹{req.amount.toLocaleString()}</td>
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
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Pay Now
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      

            {/* Complete List */}
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
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue="johndoe@example.com"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
