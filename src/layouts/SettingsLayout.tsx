import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { settingsLinks } from "../utils/settings";

const SettingsLayout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const headerColor = isDark ? "bg-black" : "bg-white";
  const bgColor = isDark ? "bg-[#0D1117]" : "bg-white";
  const hoverColor = isDark ? "hover:bg-[#21262D]" : "hover:bg-gray-100";
  const borderColor = isDark ? "border-[#30363D]" : "border-[#E5E7EB]";
  const textColor = isDark ? "text-[#C9D1D9]" : "text-[#111827]";
  const subTextColor = isDark ? "text-[#8B949E]" : "text-[#6B7280]";

  return (
    <div
      className={`min-h-screen flex flex-col ${bgColor} ${textColor} transition-colors duration-300`}
    >
      <header
        className={`flex items-center justify-between px-6 py-4 border-b ${headerColor} ${borderColor}`}
      >
        <div
          style={{
            fontFamily: "'Pacifico', cursive",
          }}
          className="text-3xl font-bold text-rose-700 cursor-pointer"
          role="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Foryou
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={`md:hidden p-2 rounded-full ${hoverColor}`}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${hoverColor}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-100" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>
      </header>

      <div className={`xl:px-34 p-5 flex flex-col flex-1 overflow-hidden`}>
        <div className="flex items-center gap-3 pt-1 pb-3">
          <div className="rounded-full bg-rose-800 w-15 h-15"></div>

          <div className="flex flex-col justify-center">
            <Link
              to="/helenoforyou"
              className="text-lg font-semibold hover:underline"
            >
              foryou (foryou)
            </Link>
            <p className={`text-sm ${subTextColor}`}>Your personal account</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1 items-start min-h-0 gap-3">
          <aside
            className={`w-full h-full md:h-auto md:w-70 md:pr-6 transform transition-transform duration-300 z-20`}
          >
            <nav>
              {settingsLinks.map(({ section, path, icon, label }) => {
                if (section) {
                  return (
                    <h4
                      key={section}
                      className={`text-[14px] font-medium ${subTextColor} p-2`}
                    >
                      {section}
                    </h4>
                  );
                }

                const isActive =
                  pathname === path ||
                  (pathname === "/settings/" && path === "/settings/profile/");

                return (
                  <Link
                    key={path}
                    to={path ?? "/"}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
                            ${
                              isActive
                                ? `${
                                    isDark ? "bg-gray-900" : "bg-gray-100"
                                  } text-blue-600 font-semibold`
                                : `${
                                    isDark
                                      ? "hover:bg-gray-900"
                                      : "hover:bg-gray-100"
                                  } text-inherit`
                            }
                        `}
                  >
                    <div>{icon}</div>
                    <span className={`text-sm`}>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className={`flex-1 ${borderColor}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;

{
  /**

  <div className={`flex flex-col min-h-screen ${bgColor} ${textColor}`}>
      <header
        className={`flex items-center justify-between px-6 py-3 border-b ${borderColor}`}
      >
        <div
          style={{ fontFamily: "'Pacifico', cursive" }}
          className="text-3xl font-bold text-rose-700"
        >
          Heleno
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${hoverColor}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <img
            src={profile}
            alt="profile"
            className="w-8 h-8 rounded-full border border-gray-300 object-cover"
          />

          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 active:scale-95 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-col flex-1 relative">
        <header className="p-6">
          <div className="text-2xl font-semibold mb-4">Helenoforyou</div>
          <p className="text-sm text-gray-500 mb-6">
            Manage your account preferences
          </p>
        </header>

        <div className="flex flex-1">
          <aside
            className={`hidden md:flex flex-col w-64 border-r ${borderColor} p-4 ${bgColor}`}
          >
            <nav className="space-y-1">
              {settingsLinks.map(({ section, path, icon, label }) => {
                if (section) {
                  return (
                    <h4
                      key={section}
                      className="text-xs font-bold uppercase text-gray-500 mt-4 mb-2 tracking-widest"
                    >
                      {section}
                    </h4>
                  );
                }

                const isActive = pathname === path;
                return (
                  <Link
                    key={path}
                    to={path ?? "/"} // ✅ prevents TypeScript "undefined" error
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : `text-gray-700 ${hoverColor}`
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                        isActive ? "bg-indigo-100" : "bg-gray-100"
                      }`}
                    >
                      {icon}
                    </div>
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 p-6 overflow-y-auto">
            <div
              className={`rounded-2xl p-6 border ${borderColor} ${
                isDark ? "bg-gray-900/40" : "bg-white"
              }`}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
<aside
          className={`md:hidden fixed top-0 left-0 w-72 h-full z-50 ${bgColor} ${textColor} border-r ${borderColor} shadow-lg transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Settings Menu
            </h3>
            <button
              className="p-2 rounded-xl hover:bg-gray-200 active:scale-95"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {settingsLinks.map(({ section, path, icon, label }) => {
              if (section) {
                return (
                  <h4
                    key={section}
                    className="text-xs font-bold uppercase text-gray-500 mt-4 mb-2 tracking-widest"
                  >
                    {section}
                  </h4>
                );
              }

              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  to={path!}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : `text-gray-700 ${hoverColor}`
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                      isActive ? "bg-indigo-100" : "bg-gray-100"
                    }`}
                  >
                    {icon}
                  </div>
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
    
*/
}
