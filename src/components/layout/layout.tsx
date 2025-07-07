import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
