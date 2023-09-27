import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Transaction from "./components/Transaction";
import Invoice from "./components/Invoice";
import { TransactionProvider } from "./context/TransactionContext";
import CustomerList from "./components/CustomerList";

function App() {

  return (
    <TransactionProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/admin" element={<CustomerList/>} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
}

export default App;
