import React, { useState } from "react";
import { FilterType } from "../interfaces/filter";

interface FilterToggleSwitchProps {
  onFilterChange: (filter: FilterType) => void;
}

const FilterToggleSwitch: React.FC<FilterToggleSwitchProps> = ({
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleChange = (filter: FilterType) => {
    setFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div>
      <span className="font-semibold text-lg text-white mr-4">Filter: </span>
      <select
        value={filter}
        onChange={(e) => handleChange(e.target.value as FilterType)}
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
