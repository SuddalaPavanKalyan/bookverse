import { useState } from "react";

const Appearance = () => {
  const themes = [
    { name: "Light default", type: "light" },
    { name: "Light colorblind", type: "light" },
    { name: "Light Tritanopia", type: "light" },
    { name: "Dark default", type: "dark" },
    { name: "Dark colorblind", type: "dark" },
    { name: "Dark Tritanopia", type: "dark" },
    { name: "Soft dark", type: "dark" }
  ];

  const [selectedTheme, setSelectedTheme] = useState("Dark default");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">Theme preferences</h1>
      <hr className="border-b border-gray-200" />
      <p className="text-sm text-gray-500 mt-1">
        Choose how Heleno looks to you. Select a single theme, or sync with your
        system and automatically switch between day and night themes. Selections
        are applied immediately and saved automatically.
      </p>

      <div className="flex flex-col md:flex-row mt-5 gap-10">
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme mode
            </label>
            <div className="flex flex-row items-center gap-2">
              <select className="w-fit border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Single theme</option>
                <option>Sync with system</option>{" "}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                GitHub will use your selected theme
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setSelectedTheme(theme.name)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left
              ${
                selectedTheme === theme.name
                  ? "border-blue-500"
                  : "border-gray-300 dark:border-gray-700 hover:border-blue-400"
              }
            `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{theme.name}</span>
                  {selectedTheme === theme.name && (
                    <span className="text-blue-500 text-sm font-semibold">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {theme.type === "light" ? "Light theme" : "Dark theme"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
