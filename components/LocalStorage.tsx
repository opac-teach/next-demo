"use client";

import { useEffect, useState } from "react";

const LocalStorage = () => {
  const [balance, setBalance] = useState(() => {
    try {
      const savedBalance = localStorage.getItem("balance");

      return savedBalance ? JSON.parse(savedBalance) : 0;
    } catch (error) {
      console.error("Local storage error:", error);

      return 0;
    }
  });
  const [transaction, setTransaction] = useState({
    amount: "0",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("balance", JSON.stringify(balance));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [balance]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const amount = parseFloat(transaction.amount);

    if (isNaN(amount) || amount === 0) {
    //   console.error("Amount is missing.");
        setTransaction({ amount: "0" });
      return;
    }

    setBalance((prevBalance:number) => prevBalance + amount);
    setTransaction({ amount: "0" });
  }

  return (
    // <main className="flex flex-col gap-2 items-center mt-20 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 rounded-sm w-[300px] shadow-md mx-auto">
    <main className="flex flex-col gap-2 items-center mt-20 bg-gray-100 rounded-sm w-[300px] shadow-md mx-auto">
        <p>Balance:</p>
        <p className="m-0">{isClient ? `THZ ${Number(balance?.toFixed(2) ?? 0)}` : ""}</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                value={transaction.amount}
                onChange={handleChange}
                className="border p-1 border-black rounded-sm bg-white"
            />
            <button
            aria-label="Add transaction"
            className="rounded-lg shadow-md bg-white m-5 p-2 hover:bg-gradient-to-br hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500">
                Add transaction
            </button>
        </form>
    </main>


);
};

export default LocalStorage;