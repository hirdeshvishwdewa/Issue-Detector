import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar({ onSelectType }) {
  const [issueTypes, setIssueTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/issue-types-counts')
      .then(response => {
        setIssueTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the issue types and counts!', error);
      });
  }, []);

  return (
    <div className="w-1/6 h-screen bg-gray-800 text-white p-4">
      <ul>
        {issueTypes.map(issueType => (
          <li key={issueType.type} className="mb-2 cursor-pointer" onClick={() => onSelectType(issueType.type)}>
            {issueType.type}: {issueType.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
