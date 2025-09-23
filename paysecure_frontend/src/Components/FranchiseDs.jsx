import React, { useState } from "react";
import { User, CreditCard, Clock } from "lucide-react";
export default function FranchiseDs() {
  const [activeTab, setActiveTab] = useState("account");
  const [historyTab, setHistoryTab] = useState("pending");
  const [accountSubTab, setAccountSubTab] = useState("view");
const [editingId, setEditingId] = useState(null);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountName: "John Doe",
      accountNumber: "123456789012",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
      balance: 75000,
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    balance: "",
  });
  const handleNewChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId }]);
    setNewAccount({ accountName: "", accountNumber: "", bankName: "", ifsc: "", balance: "" });
    setAccountSubTab("view");
  };

  const handleEditChange = (id, e) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, [e.target.name]: e.target.value } : acc
    );
    setAccounts(updatedAccounts);
  };
  const userBankDetails = {
    accountName: "John Doe",
    accountNumber: "123456789012",
    bankName: "State Bank of India",
    ifsc: "SBIN0001234",
    balance: 75000,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={40} className="text-gray-600" />
          </div>
          <h2 className="mt-3 text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">+91 9876543210</p>
        </div>
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
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "account" && (
          <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Bank Accounts</h1>
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
                      <span className="font-semibold">Balance:</span>{" "}
                      {editingId === acc.id ? (
                        <input
                          type="number"
                          name="balance"
                          value={acc.balance}
                          onChange={(e) => handleEditChange(acc.id, e)}
                          className="px-2 py-1 border rounded w-full"
                        />
                      ) : (
                        `₹${Number(acc.balance).toLocaleString()}`
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
                  <label className="block text-gray-700">Balance</label>
                  <input
                    type="number"
                    name="balance"
                    value={newAccount.balance}
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
        {activeTab === "history" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">History</h1>
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
            {historyTab === "complete" && (
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