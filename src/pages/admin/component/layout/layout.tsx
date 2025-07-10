import React from "react";
import Sidebar from "./sidebar";


type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />

      <main className="flex-grow">{children}</main>
    </div>
  );
}
