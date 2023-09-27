// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Selamat Datang di LaundryKu!</h1>
        <p className="text-gray-600 text-lg mb-6">Kami adalah solusi terbaik untuk layanan laundry Anda.</p>
        <Link to="/transaction" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">
          Buat Transaksi
        </Link>
        <Link to="/invoice" className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 mr-4 rounded-md">
          Lihat Invoice
        </Link>
        <Link to="/admin" className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md">
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Home;
