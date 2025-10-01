import React from 'react';

type SearchBarProps = {
  query: string;
  onQueryChange: (q: string) => void;
  sort: 'asc' | 'desc';
  onSortToggle: () => void;
};

export default function SearchBar({ query, onQueryChange, sort, onSortToggle }: SearchBarProps) {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
      <input
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ 
          flex: "1",
          minWidth: "250px",
          padding: "12px 16px",
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          fontSize: "16px"
        }}
      />
      <button 
        onClick={onSortToggle}
        style={{
          padding: "12px 20px",
          background: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500"
        }}
      >
        {sort === "desc" ? "Plus recents" : "Plus anciens"}
      </button>
    </div>
  );
}