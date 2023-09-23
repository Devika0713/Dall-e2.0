// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-slate-100 sm:px-8 px-4 py-4 border-b border-slate-400">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-sky-950 text-slate-100 px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:px-8 px-4 py-8 w-full bg-slate-50 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
