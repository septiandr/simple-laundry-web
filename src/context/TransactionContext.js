// src/context/TransactionContext.js
import React, { createContext, useContext, useState } from 'react';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState({});
  const [adminTransactionData, setAdminTransactionData] = useState([]);

  // Harga dasar awal
  const initialHargaDasar = {
    kiloan: {
      '2 Hari': 10000,
      '1 Hari': 10000 * 1.25,
      kilat: 10000 * 1.3,
    },
    satuan: {
      '2 Hari': 15000,
      '1 Hari': 15000 * 1.25,
      kilat: 15000 * 1.3,
    },
  };

  const [hargaDasar, setHargaDasar] = useState(initialHargaDasar);

  const biayaTambahan = {
    '1 Hari': 0.25,
    kilat: 0.3,
  };

  // Fungsi untuk mengubah harga dasar
  const updateHargaDasar = (jenisLayanan, durasi, newPrice) => {
    setHargaDasar((prevHargaDasar) => {
      const updatedHargaDasar = { ...prevHargaDasar };
      updatedHargaDasar[jenisLayanan][durasi] = newPrice;
      return updatedHargaDasar;
    });
  };

  // Fungsi untuk mengubah harga transaksi berdasarkan indeks
  const updateTransactionPrice = (index, newPrice) => {
    setAdminTransactionData((prevAdminTransactionData) => {
      const updatedAdminTransactionData = [...prevAdminTransactionData];
      updatedAdminTransactionData[index].harga = newPrice;
      return updatedAdminTransactionData;
    });
  };

  const calculateTotalHarga = () => {
    return adminTransactionData.reduce((total, transaction) => {
      return total + transaction.harga;
    }, 0);
  };

  const totalHarga = calculateTotalHarga();

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        adminTransactionData,
        setAdminTransactionData,
        hargaDasar,
        biayaTambahan,
        totalHarga,
        updateTransactionPrice,
        updateHargaDasar, 
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  return useContext(TransactionContext);
};
