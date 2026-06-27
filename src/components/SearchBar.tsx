import { useState } from "react";

export default function SearchBar({
  onChange,
}: {
  onChange: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query.trim().toLowerCase());
    setQuery(query);
  };

  return (
    <input
      className="search-bar"
      value={query}
      onChange={handleSearch}
      placeholder="Search For Artwork..."
    />
  );
}
