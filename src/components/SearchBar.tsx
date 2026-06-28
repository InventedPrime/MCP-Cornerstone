import { useState } from "react";

type SearchBarProps = {
  onChange: (query: string, department: string) => void;
  departments: string[];
};

export default function SearchBar({ onChange, departments }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(
      query.trim().toLowerCase(),
      selectedDepartment.trim().toLowerCase(),
    );
    setQuery(query);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value;
    onChange(query.trim().toLowerCase(), department.trim().toLowerCase());
    setSelectedDepartment(department);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        value={query}
        onChange={handleSearch}
        placeholder="Search For Artwork..."
      />

      <select
        id="pet-select"
        onChange={handleDepartmentChange}
        value={selectedDepartment}
      >
        <option value="">Filter</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}
