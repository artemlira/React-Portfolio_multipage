import React from "react";
import { Outlet } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
