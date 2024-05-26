import React, { useState } from "react";
import { FilterToggleSwitchProps } from "../interfaces/filterSwitch";

const FilterToggleSwitch: React.FC<FilterToggleSwitchProps> = ({
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleChange = () => {
    const nextFilter =
      filter === "all"
        ? "completed"
        : filter === "completed"
        ? "pending"
        : "all";
    setFilter(nextFilter);
    onFilterChange(nextFilter);
  };

  return (
    <div className="">
      <span className="font-semibold text-lg text-white mr-4">Filter: </span>
      <select
        value={filter}
        onChange={handleChange}
        className="rounded-md bg-white text-black p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default FilterToggleSwitch;
