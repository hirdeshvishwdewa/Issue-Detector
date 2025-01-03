import React, { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

function Table({ issues }) {
  const [issueList, setIssueList] = useState(issues);

  const handleButtonClick = (issueId) => {
    axios.get(`http://localhost:4000/issues/${issueId}/resolved`)
      .then(response => {
        if (response.data.resolved) {
          setIssueList(issueList.filter(issue => issue.id !== issueId));
        }
        console.log('Action performed:', response.data);
      })
      .catch(error => {
        console.error('There was an error performing the action!', error);
      });
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">Triggered</th>
          <th className="py-2 px-4 border-b text-left">Type</th>
          <th className="py-2 px-4 border-b text-left">Status</th>
          <th className="py-2 px-4 border-b text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {issueList.map(issue => (
          <tr key={issue.id}>
            <td className="py-2 px-4 border-b">{format(new Date(issue.createdAt), 'dd.MM.yyyy')}</td>
            <td className="py-2 px-4 border-b">{issue.type}</td>
            <td className="py-2 px-4 border-b">{issue.status}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleButtonClick(issue.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Action
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
