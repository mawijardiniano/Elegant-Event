import React from "react";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
<div className="flex h-screen">
  <div className="w-70 bg-gray-800">
    <Sidebar />
  </div>

  <main className="flex-1 overflow-y-auto p-4 bg-white">
    {children}
  </main>
</div>

  );
}
