// src/components/Admin.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTransaction } from "../context/TransactionContext";
import { formatDateTime } from "./Invoice";

function CustomerList() {
  const { adminTransactionData, totalHarga, hargaDasar, updateHargaDasar } =useTransaction(); 
  const [jenisLayanan, setJenisLayanan] = useState(""); 
  const [durasiLayanan, setDurasiLayanan] = useState(""); 
  const [newPrice, setNewPrice] = useState(""); 

  const handleUpdateHargaDasar = () => {
    if (jenisLayanan && durasiLayanan && newPrice) {
      // Pastikan jenisLayanan, durasiLayanan, dan newPrice tidak kosong
      updateHargaDasar(jenisLayanan, durasiLayanan, parseFloat(newPrice)); // Mengirim pembaruan harga dasar
      setJenisLayanan(""); // Mengosongkan jenis layanan
      setDurasiLayanan(""); // Mengosongkan durasi layanan
      setNewPrice(""); // Mengosongkan harga baru
    }
  };

  // Fungsi untuk mendapatkan harga dasar saat ini
  const getCurrentPrice = () => {
    if (jenisLayanan && durasiLayanan) {
      const currentPrice = hargaDasar[jenisLayanan][durasiLayanan];
      return currentPrice ? `Rp ${currentPrice}` : "Harga tidak ditemukan";
    }
    return "";
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Halaman Admin</h2>

      {/* Form untuk pembaruan harga dasar */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Pembaruan Harga Dasar</h3>
        <div className="flex space-x-2">
          <select
            className="border p-2"
            onChange={(e) => setJenisLayanan(e.target.value)}
            value={jenisLayanan}
          >
            <option value="">Pilih Jenis Layanan</option>
            <option value="kiloan">Kiloan</option>
            <option value="satuan">Satuan</option>
          </select>
          <select
            className="border p-2"
            onChange={(e) => setDurasiLayanan(e.target.value)}
            value={durasiLayanan}
          >
            <option value="">Pilih Durasi Layanan</option>
            <option value="2 Hari">2 Hari</option>
            <option value="1 Hari">1 Hari</option>
            <option value="kilat">Kilat</option>
          </select>
          <input
            type="number"
            className="border p-2"
            placeholder="Harga Baru"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-md"
            onClick={handleUpdateHargaDasar}
          >
            Update
          </button>
        </div>
        {/* Menampilkan harga dasar saat ini */}
        <p className="mt-2">Harga Dasar Saat Ini: {getCurrentPrice()}</p>
      </div>

      <Link
        to="/"
        className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md mb-4 inline-block"
      >
        Kembali ke Beranda
      </Link>

      <h3 className="text-xl font-semibold mb-2">
        Daftar Semua Transaksi Admin
      </h3>

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-gray-600">
              Invoice Number
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">
              Tanggal
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">
              Nama Pelanggan
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">
              Nomor HP
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">
              Jenis Layanan
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">
              Durasi Layanan
            </th>
            <th className="border border-gray-300 p-2 text-gray-600">Harga</th>
            {/* Tambahkan kolom lain sesuai kebutuhan */}
          </tr>
        </thead>
        <tbody>
          {adminTransactionData.map((data, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                {data.invoiceNumber}
              </td>
              <td className="border border-gray-300 p-2">
                {formatDateTime(data.tanggal)}
              </td>
              <td className="border border-gray-300 p-2">
                {data.namaPelanggan}
              </td>
              <td className="border border-gray-300 p-2">{data.nomorHP}</td>
              <td className="border border-gray-300 p-2">
                {data.jenisLayanan || "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {data.durasiLayanan || "-"}
              </td>
              <td className="border border-gray-300 p-2">Rp {data.harga}</td>
              {/* Tambahkan kolom lain sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menampilkan total harga akhir */}
      <div>
        <p className="text-2xl font-bold">Total Harga Akhir: Rp {totalHarga}</p>
      </div>
    </div>
  );
}

export default CustomerList;
