import React, { useState } from 'react';

const AdminParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    fetch('/api/delegates')
      .then(res => res.json())
      .then(data => {
        setParticipants(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load participants');
        setLoading(false);
      });
  }, []);

  return (
    <section className="page active" style={{padding:'2rem 1rem', maxWidth:1000, margin:'0 auto'}}>
      <h2 style={{fontWeight:900, fontFamily:'Montserrat, sans-serif', fontSize:'2rem', color:'#001f3f', marginBottom:24}}>Registered Participants</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{color:'#c00'}}>{error}</div>}
      {!loading && !error && (
        <table style={{width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:12, boxShadow:'0 2px 16px #001f3f22'}}>
          <thead>
            <tr style={{background:'#28a745', color:'#fff', fontWeight:900}}>
              <th style={{padding:'0.7rem'}}>Full Name</th>
              <th style={{padding:'0.7rem'}}>Email</th>
              <th style={{padding:'0.7rem'}}>Phone</th>
              <th style={{padding:'0.7rem'}}>Payment Type</th>
              <th style={{padding:'0.7rem'}}>Registered At</th>
              <th style={{padding:'0.7rem'}}>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, i) => (
              <tr key={i} style={{borderBottom:'1px solid #eee'}}>
                <td style={{padding:'0.6rem', fontWeight:700}}>{p.full_name}</td>
                <td style={{padding:'0.6rem'}}>{p.email}</td>
                <td style={{padding:'0.6rem'}}>{p.phone}</td>
                <td style={{padding:'0.6rem'}}>{p.payment_type}</td>
                <td style={{padding:'0.6rem'}}>{p.registered_at ? new Date(p.registered_at).toLocaleString() : ''}</td>
                <td style={{padding:'0.6rem'}}>
                  {p.evidence_filename ? (
                    <a href={`/uploads/${p.evidence_filename}`} target="_blank" rel="noopener noreferrer" style={{color:'#28a745', fontWeight:700}}>View</a>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AdminParticipants;
