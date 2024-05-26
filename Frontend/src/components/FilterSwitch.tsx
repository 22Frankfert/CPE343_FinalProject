import React, { useState } from "react";
import { FilterToggleSwitchProps } from "../interfaces/filterSwitch";



const FilterToggleSwitch: React.FC<FilterToggleSwitchProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleChange = () => {
    const nextFilter = filter === "all" ? "completed" : filter === "completed" ? "pending" : "all";
    setFilter(nextFilter);
    onFilterChange(nextFilter);
  };

  return (
    <div className="filter-toggle-switch">
      <select 
      value={filter} 
      onChange={handleChange}  
      className="rounded-full bg-white text-black px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Show All</option>
        <option value="completed">Show Completed</option>
        <option value="pending">Show Pending</option>
      </select>
    </div>
  );
};

export default FilterToggleSwitch;

