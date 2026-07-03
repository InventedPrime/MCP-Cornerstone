import { useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { sleep, hiddenInformation } from "../utils/sleep";

type SearchBarProps = {
  onChange: (query: string, department: string) => void;
  departments: string[];
};

export default function SearchBar({ onChange, departments }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { setIsLoading } = useLoader();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    await hiddenInformation();
    onChange(
      query.trim().toLowerCase(),
      selectedDepartment.trim().toLowerCase(),
    );
    setIsLoading(false);
    setIsDisabled(false);
  };
  return (
    <form onSubmit={(e) => handleSearch(e)} className="search-bar-container">
      <input
        disabled={isDisabled}
        name="search"
        className="search-bar"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search For Artwork..."
      />
      <select
        id="pet-select"
        name="filter"
        onChange={(e) => setSelectedDepartment(e.target.value)}
        value={selectedDepartment}
      >
        <option value="">Filter</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </form>
  );
}
