import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-200 h-screen w-[300px]">
      <h1 className="font-bold text-2xl">Elegant Event</h1>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/venue">Venues</Link>
        </li>
        <li>
          <Link to="/admin/setting">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
