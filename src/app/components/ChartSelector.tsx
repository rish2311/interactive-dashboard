
                                  'use client'
                                  import React, { useState } from "react";
                                  import { FaCog } from "react-icons/fa";

                                  export default function ChartSelector({ chartVisibility, onVisibilityChange }: any) {
                                    const [isOpen, setIsOpen] = useState(false);

                                    const toggleChartVisibility = (chart: string) => {
                                      onVisibilityChange(chart);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
      >
        <FaCog className="mr-2" />
        Settings
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.keys(chartVisibility).map((chart) => (
              <button
                key={chart}
                onClick={() => toggleChartVisibility(chart)}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  chartVisibility[chart] ? "font-bold" : ""
                }`}
                role="menuitem"
              >
                {chartVisibility[chart] ? `Hide ${chart}` : `Show ${chart}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
