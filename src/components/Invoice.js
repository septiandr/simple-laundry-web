// src/components/Invoice.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';

function Invoice() {
  const { transactions } = useTransaction(); // Menggunakan konteks untuk mengakses data transaksi
  console.log("🚀 ~ Invoice ~ transactions:", transactions)

  return (
    <div className="bg-gradient-to-b  from-purple-500 to-purple-700  min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Invoice Laundry</h1>
        {transactions ? (
          <div className="mb-4">
            <p className="text-gray-600">Nomor Invoice: {transactions.invoiceNumber}</p>
            <p className="text-gray-600">Tanggal: {formatDateTime(transactions.tanggal)}</p>
            <p className="text-gray-600">Nama Pelanggan: {transactions.namaPelanggan}</p>
            <p className="text-gray-600">Nomor HP: {transactions.nomorHP}</p>
            <p className="text-gray-600">Jenis Layanan: {transactions.jenisLayanan}</p>
            <p className="text-gray-600">Durasi Layanan: {transactions.durasiLayanan}</p>
          </div>
        ) : (
          <p className="text-red-600">Data transaksi tidak ditemukan.</p>
        )}
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-gray-600">Deskripsi Layanan</th>
              <th className="border border-gray-300 p-2 text-gray-600">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                {transactions.jenisLayanan} - {transactions.durasiLayanan}
              </td>
              <td className="border border-gray-300 p-2">Rp {transactions.harga}</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold">
            Total Biaya: Rp {transactions.harga}
          </p>
        </div>
        <Link to="/" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-purple-500">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

export default Invoice;

export function formatDateTime(dateTimeString) {
    // Membuat objek Date dari string tanggal dan waktu
    const dateTime = new Date(dateTimeString);
  
    // Format tanggal dalam bentuk 'DD MMMM YYYY'
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateTime.toLocaleDateString('id-ID', options);
  
    // Format waktu dalam bentuk 'HH:MM:SS'
    const formattedTime = dateTime.toLocaleTimeString();
  
    // Menggabungkan tanggal dan waktu menjadi format yang lebih baik
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
  
    return formattedDateTime;
  }