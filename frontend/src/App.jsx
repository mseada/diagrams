import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import BabysittersPage from './pages/BabysittersPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import BabysitterProfile from './pages/BabysitterProfile.jsx';
import AdminPage from './pages/AdminPage.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/babysitters" element={<BabysittersPage />} />
        <Route path="/babysitters/:id" element={<BabysitterProfile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}
