import React, { useEffect, useState } from 'react';

const target = new Date('2025-09-01T00:00:00');

const Countdown = () => {
  const [time, setTime] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTime({ expired: true });
        clearInterval(interval);
        return;
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Google Fonts for digital style
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  if (time.expired) return <div className="countdown" style={{fontFamily:'Share Tech Mono, monospace', fontWeight:700, fontSize:'2.2rem'}}>Conference Started!</div>;
  return (
    <div className="countdown" style={{fontFamily:'Share Tech Mono, monospace', fontWeight:700, fontSize:'2.2rem', letterSpacing:'2px', color:'#ffc107', textShadow:'0 2px 8px #001f3f55'}}>
      <span style={{fontSize:'2.6rem'}}>{String(time.d).padStart(2,'0')}</span>d
      <span style={{fontSize:'2.6rem', marginLeft:12}}>{String(time.h).padStart(2,'0')}</span>h
      <span style={{fontSize:'2.6rem', marginLeft:12}}>{String(time.m).padStart(2,'0')}</span>m
      <span style={{fontSize:'2.6rem', marginLeft:12}}>{String(time.s).padStart(2,'0')}</span>s
    </div>
  );
};

export default Countdown;
