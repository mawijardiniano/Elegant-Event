
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center px-5 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500 pl-6 font-semibold shadow-sm"
        : "text-gray-700 hover:bg-blue-50"
    }`;

  return (
    <div className="bg-white border-r border-gray-200 h-screen w-[280px] shadow-sm">
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-700">Elegant Event</h1>
      </div>
      <ul className="flex flex-col gap-1 mt-6 px-2">
        <li>
          <Link to="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings" className={linkClass("/admin/bookings")}>
            Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin/venue" className={linkClass("/admin/venue")}>
            Venues
          </Link>
        </li>
      </ul>
    </div>
  );
}
