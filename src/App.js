
import React, {useEffect, useState} from "react";
import './App.css';

export default function App(){
  const API_BASE = process.env.REACT_APP_API || 'https://localhost:60926';
  const [data,setData]=useState([]);
  const [error,setError]=useState("");

  useEffect(()=>{
    fetch(`${API_BASE}/api/Campaigns/getCampaigns`).then(r=>r.json()).then(setData);
  },[]);

  const changeStatus=(id,newStatus)=>{
    const old=[...data];
    setData(d=>d.map(c=>c.id===id?{...c,status:newStatus}:c));

    fetch(`${API_BASE}/api/campaigns/${id}/status`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "X-API-KEY":"Ad-Api-Key-123"
      },
      body:JSON.stringify({newStatus})
    }).then(r=>{
      if(!r.ok) throw new Error("Failed");
    }).catch(()=>{
      setError("Update failed, reverted. Please check whether it is a valid selection or not.");
      setData(old);
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Campaign Dashboard</h1>
          <p className="sub">Manage campaigns at a glance</p>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="table-wrap">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr className="empty-row"><td colSpan="4">No campaigns found</td></tr>
            ) : (
              data.map(c => (
                <tr key={c.id}>
                  <td className="name" data-label="Name">{c.name}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${String(c.status).toLowerCase()}`}>{c.status}</span>
                  </td>
                  <td className="budget" data-label="Budget">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(c.budget ?? 0)}</td>
                  <td data-label="Change">
                    <select className="status-select" value={c.status} onChange={e=>changeStatus(c.id,e.target.value)}>
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Archived</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
