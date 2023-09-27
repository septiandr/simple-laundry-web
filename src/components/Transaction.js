// src/components/Transaction.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTransaction, } from '../context/TransactionContext';

const generateRandomInvoiceNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let invoiceNumber = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      invoiceNumber += characters[randomIndex];
    }
    return 'INV' + invoiceNumber;
  };

function Transaction() {
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [jenisLayanan, setJenisLayanan] = useState('kiloan');
  const [durasiLayanan, setDurasiLayanan] = useState('2 Hari');
  const navigate = useNavigate();
  const { setTransactions, setAdminTransactionData, hargaDasar, biayaTambahan } = useTransaction(); // Menggunakan konteks untuk mengatur data transaksi
  console.log("🚀 ~ Transaction ~ hargaDasar:", hargaDasar)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Lakukan sesuatu dengan data transaksi, seperti menghitung biaya atau menyimpan data.
    const hargaDasarLayanan = hargaDasar[jenisLayanan][durasiLayanan];
    const tambahanBiaya = biayaTambahan[durasiLayanan] || 0;
    const hargaTransaksi = hargaDasarLayanan + hargaDasarLayanan * tambahanBiaya;
    const invoiceNumber = generateRandomInvoiceNumber();
  
    // Membuat objek transaksi dengan harga yang sudah dihitung dan tanggal saat ini
    const currentDate = new Date(); // Dapatkan tanggal dan waktu saat ini
    const transaction = {
      invoiceNumber,
      namaPelanggan,
      nomorHP,
      jenisLayanan,
      durasiLayanan,
      harga: hargaTransaksi, // Menyimpan harga transaksi yang sudah dihitung
      tanggal: currentDate.toISOString(), // Menggunakan ISO string untuk format tanggal
    };
  
    // Menyimpan data transaksi ke konteks
    setAdminTransactionData((prevAdminTransactionData) => [
      ...prevAdminTransactionData,
      transaction,
    ]);
    setTransactions(transaction); // Menyimpan data transaksi ke konteks
    navigate('/invoice'); // Pindah ke halaman invoice setelah transaksi
  };
  return (
    <div className="bg-gradient-to-b from-purple-500 to-purple-700 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Formulir Transaksi</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="namaPelanggan" className="text-gray-600">Nama Pelanggan:</label>
            <input
              type="text"
              id="namaPelanggan"
              className="w-full border rounded-md py-2 px-3 text-gray-800 focus:ring-2 focus:ring-purple-500"
              value={namaPelanggan}
              onChange={(e) => setNamaPelanggan(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nomorHP" className="text-gray-600">Nomor HP:</label>
            <input
              type="text"
              id="nomorHP"
              className="w-full border rounded-md py-2 px-3 text-gray-800 focus:ring-2 focus:ring-purple-500"
              value={nomorHP}
              onChange={(e) => setNomorHP(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jenisLayanan" className="text-gray-600">Jenis Layanan:</label>
            <select
              id="jenisLayanan"
              className="w-full border rounded-md py-2 px-3 text-gray-800 focus:ring-2 focus:ring-purple-500"
              value={jenisLayanan}
              onChange={(e) => setJenisLayanan(e.target.value)}
            >
              <option value="kiloan">Kiloan</option>
              <option value="satuan">Satuan (Dry Cleaning)</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="durasiLayanan" className="text-gray-600">Durasi Layanan:</label>
            <select
              id="durasiLayanan"
              className="w-full border rounded-md py-2 px-3 text-gray-800 focus:ring-2 focus:ring-purple-500"
              value={durasiLayanan}
              onChange={(e) => setDurasiLayanan(e.target.value)}
            >
              <option value="2 Hari">2 Hari</option>
              <option value="1 Hari">1 Hari</option>
              <option value="Kilat">Kilat (10 Jam)</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-purple-500"
            >
              Hitung Biaya
            </button>
          </div>
        </form>
        <Link to="/" className="text-purple-600 hover:underline">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

export default Transaction;
