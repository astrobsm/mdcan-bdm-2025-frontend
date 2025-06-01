import React from 'react';

const logoUrl = process.env.PUBLIC_URL + '/logo-mdcan.png';

const Banner = () => {
  return (
    <div className="banner" style={{
      position:'relative',
      color:'#fff',
      padding:'3.5rem 1rem 2.5rem 1rem',
      overflow:'hidden',
      minHeight:340,
      background: '#001f3f',
    }}>
      {/* Logo */}
      <img src={logoUrl} alt="MDCAN Logo" style={{position:'absolute', top:24, left:24, width:80, height:80, borderRadius:'50%', boxShadow:'0 2px 12px #001f3f55', background:'#fff', objectFit:'contain', border:'3px solid #ffc107'}} />
      <div style={{position:'relative', zIndex:1, textAlign:'center', background:'rgba(40,167,69,0.7)', borderRadius:'1.2rem', padding:'1.5rem 0.5rem', boxShadow:'0 2px 16px #001f3f55'}}>
        <h1 style={{fontWeight:900, fontSize:'2.7rem', fontFamily:'Montserrat, sans-serif', letterSpacing:1, marginBottom:8, textShadow:'0 2px 12px #001f3f55'}}>
          MDCAN 14th Biennial Delegates' Meeting and SCIENTIFIC Conference
        </h1>
        <p style={{fontWeight:700, fontSize:'1.2rem', fontFamily:'Montserrat, sans-serif', marginBottom:12, textShadow:'0 2px 8px #001f3f55'}}>
          <em>‘Otanisi Psychosis’: THE MENTAL HEALTH IMPLICATIONS OF THE DWINDLING SOCIO-ECONOMIC FORTUNES OF NIGERIANS</em>
        </p>
        <ul style={{
          fontWeight:700,
          fontSize:'1.05rem',
          color:'#ffc107',
          textShadow:'0 2px 8px #001f3f88',
          background:'rgba(0,31,63,0.7)',
          borderRadius:12,
          padding:'0.8rem 1.5rem',
          margin:'0 auto 0.5rem auto',
          display:'inline-block',
          fontFamily:'Montserrat, sans-serif'
        }}>
          <li>Medical Migration Syndrome (Japa): Fortunes and Misfortunes</li>
          <li>Physician heal thyself: The mismatch between knowledge and practice</li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;