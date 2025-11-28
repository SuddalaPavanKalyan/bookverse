import clsx from "clsx";
import { AlignLeft, X } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const navItems = [
  { key: "dashboard", label: "Dashboard", path: "" },
  { key: "borrowed", label: "Borrowed", path: "borrowed" },
  { key: "requested", label: "Requested", path: "requested" },
  { key: "reserved", label: "Reserved", path: "reserved" },
  { key: "cart", label: "Cart", path: "cart" },
];

export default function MyLibraryLayout() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const toggle = () => setMenuOpen((m) => !m);

  return (
    <div className="relative flex w-full h-full overflow-hidden bg-white">
      <aside
        className={clsx(
          "absolute top-0 left-0 h-full w-[150px] bg-white flex flex-col justify-between transition-transform duration-500 ease-in-out z-100",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={toggle}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <nav className="flex-1 overflow-y-auto mt-16 px-4 py-2 space-y-3">
          {navItems.map(({ key, label, path }) => (
            <button
              key={key}
              onClick={() => {
                navigate(`/my-library/${path}`);
                setActiveTab(label);
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-300",
                activeTab === label
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div
        className={clsx(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out",
          isMenuOpen ? "md:ml-[150px]" : "md:ml-0"
        )}
      >
        <main className="flex-1 overflow-y-auto bg-white rounded-l-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md">
            {!isMenuOpen && (
              <button
                onClick={toggle}
                className="p-2 rounded-full hover:bg-gray-100 mr-2"
              >
                <AlignLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <h1 className="flex-1 text-md md:text-lg font-bold text-gray-800">
              Your <span className="text-blue-600">{activeTab}</span> Books
            </h1>
          </div>

          <section className="p-5 min-h-[80vh]">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}
