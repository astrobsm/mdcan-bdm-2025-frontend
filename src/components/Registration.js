import React, { useState, useEffect } from 'react';

const feeTiers = [
  { id: 'early', label: 'Early bird (≤ June 30, 2025)', amount: 100000, deadline: new Date('2025-06-30T23:59:59') },
  { id: 'late', label: 'Late (July 1 ‑ Aug 31, 2025)', amount: 120000, deadline: new Date('2025-08-31T23:59:59') },
  { id: 'onsite', label: 'Onsite (from Sept 1, 2025)', amount: 150000, deadline: null },
];

function getCurrentFee() {
  const now = new Date();
  if (now <= feeTiers[0].deadline) return feeTiers[0];
  if (now <= feeTiers[1].deadline) return feeTiers[1];
  return feeTiers[2];
}

const Registration = ({ onRegistered }) => {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', institution: '', specialty: '', evidence: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const currentFee = getCurrentFee();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Playfair+Display:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const data = new FormData();
    data.append('full_name', form.full_name);
    data.append('email', form.email);
    data.append('phone', form.phone);
    data.append('institution', form.institution);
    data.append('specialty', form.specialty);
    data.append('amount', currentFee.amount);
    data.append('payment_type', currentFee.id);
    data.append('evidence', form.evidence);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Registration failed');
      onRegistered();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page active" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', minHeight: 520, borderRadius: '1.5rem', boxShadow: '0 8px 32px #001f3f22', padding: '2.5rem 1rem', position: 'relative'}}>
      <div style={{maxWidth: 480, margin: '0 auto', background: 'rgba(255,255,255,0.95)', borderRadius: '1.2rem', boxShadow: '0 2px 16px #28a74522', padding: '2.2rem 2rem 2rem 2rem'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '2.2rem', color: '#001f3f', textAlign: 'center', marginBottom: 18, letterSpacing: 1}}>Registration</h2>
        <ul style={{marginBottom: 18, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#28a745', fontSize: '1.1rem'}}>
          {feeTiers.map(tier => (
            <li key={tier.id} style={{marginBottom: 4, background: tier.id === currentFee.id ? '#ffc107' : '#e0e7ff', color: tier.id === currentFee.id ? '#001f3f' : '#28a745', borderRadius: 6, padding: '4px 10px', fontWeight: tier.id === currentFee.id ? 900 : 700, boxShadow: tier.id === currentFee.id ? '0 2px 8px #ffc10755' : 'none'}}>{tier.label}: ₦{tier.amount.toLocaleString()}</li>
          ))}
        </ul>
        <p style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom: 18}}>
          <span style={{color:'#28a745'}}>Account:</span> MDCAN BDM ENUGU | <span style={{color:'#ffc107'}}>Bank:</span> UBA | <span style={{color:'#28a745'}}>No.:</span> 1027616784
        </p>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:18}}>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Full Name:
            <input name="full_name" value={form.full_name} onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #28a745', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Email:
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #28a745', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Phone:
            <input name="phone" value={form.phone} onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #28a745', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Institution:
            <input name="institution" value={form.institution} onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #ffc107', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Specialty:
            <input name="specialty" value={form.specialty} onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #ffc107', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <label style={{fontWeight: 700, color: '#001f3f', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem'}}>Upload Evidence of Payment:
            <input type="file" name="evidence" accept="image/*,application/pdf" onChange={handleChange} required style={{fontWeight:700, fontFamily:'Montserrat, sans-serif', fontSize:'1.1rem', border:'2px solid #001f3f', borderRadius:8, padding:'0.7rem', marginTop:4, background:'#f8fafc'}} />
          </label>
          <button className="btn btn-primary" type="submit" disabled={submitting} style={{fontWeight:900, fontFamily:'Montserrat, sans-serif', fontSize:'1.2rem', background:'linear-gradient(90deg,#28a745 60%,#ffc107 100%)', color:'#fff', border:'none', borderRadius:10, boxShadow:'0 2px 12px #28a74555', padding:'0.9rem 2.2rem', marginTop:8}}>{submitting ? 'Submitting...' : 'Register & Continue'}</button>
          {error && <div style={{color:'#c00', fontWeight:700, fontFamily:'Montserrat, sans-serif', textAlign:'center'}}>{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default Registration;
