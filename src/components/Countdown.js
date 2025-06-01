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
    link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Responsive styles
  const digitStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 900,
    fontSize: 'clamp(1.5rem, 7vw, 3.2rem)', // Responsive font size
    background: '#222',
    color: '#ffc107',
    borderRadius: '8px',
    padding: '0.2em 0.5em',
    margin: '0 4px',
    boxShadow: '0 2px 12px #001f3f55',
    letterSpacing: '2px',
    display: 'inline-block',
    minWidth: '2.2em',
    textAlign: 'center',
  };

  if (time.expired) {
    return (
      <div
        className="countdown"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontWeight: 900,
          fontSize: 'clamp(1.2rem, 6vw, 2.6rem)',
          color: '#ffc107',
          textShadow: '0 2px 8px #001f3f55',
          textAlign: 'center',
        }}
      >
        Conference Started!
      </div>
    );
  }

  return (
    <div
      className="countdown"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontWeight: 900,
        fontSize: 'clamp(1.2rem, 6vw, 2.6rem)', // Responsive font size
        letterSpacing: '2px',
        color: '#ffc107',
        textShadow: '0 2px 8px #001f3f55',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.3em',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <span style={digitStyle}>{String(time.d).padStart(2, '0')}</span>
      <span style={{ fontSize: 'clamp(1rem, 4vw, 2rem)', color: '#fff', margin: '0 2px' }}>d</span>
      <span style={digitStyle}>{String(time.h).padStart(2, '0')}</span>
      <span style={{ fontSize: 'clamp(1rem, 4vw, 2rem)', color: '#fff', margin: '0 2px' }}>h</span>
      <span style={digitStyle}>{String(time.m).padStart(2, '0')}</span>
      <span style={{ fontSize: 'clamp(1rem, 4vw, 2rem)', color: '#fff', margin: '0 2px' }}>m</span>
      <span style={digitStyle}>{String(time.s).padStart(2, '0')}</span>
      <span style={{ fontSize: 'clamp(1rem, 4vw, 2rem)', color: '#fff', margin: '0 2px' }}>s</span>
    </div>
  );
};

export default Countdown;