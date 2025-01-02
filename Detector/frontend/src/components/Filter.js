import React from 'react';

function Filter({ filterText, onFilterTextChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Filter issues..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
}

export default Filter;
