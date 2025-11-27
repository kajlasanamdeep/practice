import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [report, setReport] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    amount: '',
    type: 'credit',
  });
  const handleChange = (input, value) => {
    setFormData((prev) => ({
      ...prev,
      [input]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(formData);
    if (Object.keys(formData).every((key) => formData[key])) {
      const newReport = report;
      const existingRecordIndex = report.findIndex(
        (row) => row.userId === formData.userId
      );
      if (existingRecordIndex < 0) {
        newReport.push({
          userId: formData.userId,
          totalCredit: formData.type === 'credit' ? formData.amount : 0,
          totalDebit: formData.type === 'debit' ? formData.amount : 0,
          balance:
            formData.type === 'credit' ? formData.amount : -formData.amount,
        });
      } else {
        if (formData.type === 'credit') {
          newReport[existingRecordIndex].totalCredit += +formData.amount;
          newReport[existingRecordIndex].balance += +formData.amount;
        } else {
          newReport[existingRecordIndex].totalDebit += +formData.amount;
          newReport[existingRecordIndex].balance -= formData.amount;
        }
      }
      setReport(newReport);
      setFormData({
        userId: '',
        amount: '',
        type: 'credit',
      });
    } else {
      alert('Please fill all fields !');
      return;
    }
  };
  return (
    <>
      <div>
        <h1>Enter New Transaction</h1>
        <div>
          <label>userID</label>
          <input
            style={{ margin: '5px' }}
            type="number"
            value={formData.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
          ></input>
        </div>
        <div>
          <label>Type</label>
          <select
            style={{ margin: '5px' }}
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="debit">Debit</option>
            <option value="credit">Crebit</option>
          </select>
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            style={{ margin: '5px' }}
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
          ></input>
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        <h1>Report</h1>
        <div>
          <ul>
            {report.map((row) => {
              return (
                <li key={row?.userId}>
                  <p>UserId :- {row.userId}</p>
                  <p>TotalDebit :- {row?.totalDebit}</p>
                  <p>TotalCredit :- {row?.totalCredit}</p>
                  <p>Balance :- {row?.balance}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
