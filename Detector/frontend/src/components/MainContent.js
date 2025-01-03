import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import Table from './Table';

function MainContent({ selectedType }) {
  const [issues, setIssues] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const url = selectedType ? `http://localhost:4000/issues/type/${selectedType}` : 'http://localhost:4000/issues';
    axios.get(url)
      .then(response => {
        setIssues(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the issues!', error);
      });
  }, [selectedType]);
  let filteredIssues = issues;
  if (filterText !== "") {
    filteredIssues = issues.filter(issue =>
      issue.type.toLowerCase().includes(filterText.toLowerCase()) ||
      issue.status.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  return (
    <div className="w-5/6 h-screen p-4 overflow-auto">
      <h1 className="text-3xl mb-4">Issues</h1>
      <Filter filterText={filterText} onFilterTextChange={setFilterText} />
      <Table issues={filteredIssues} />
    </div>
  );
}

export default MainContent;
