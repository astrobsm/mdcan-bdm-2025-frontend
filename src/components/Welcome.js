import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';
const flierUrls = [
  process.env.PUBLIC_URL + '/flier1.jpg',
  process.env.PUBLIC_URL + '/flier2.jpg',
  process.env.PUBLIC_URL + '/flier3.jpg', // Ensure this file exists
];

const Welcome = ({ onRegister, onAdmin }) => {
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Slideshow logic with Murph transition (crossfade + scale)
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % flierUrls.length);
        setTransitioning(false);
      }, 700); // transition duration
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="page active" style={{position:'relative', overflow:'hidden', minHeight: '100vh', padding:0}}>
      {/* Flier slideshow background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#001f3f',
      }}>
        {flierUrls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Conference Flier ${i+1}`}
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover',
              opacity: slide === i ? 1 : 0,
              transform: slide === i ? (transitioning ? 'scale(1.08)' : 'scale(1)') : 'scale(1.04)',
              transition: 'opacity 0.7s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1)',
              filter: 'brightness(0.85) blur(0.5px)',
            }}
          />
        ))}
      </div>
      {/* Content overlay */}
      <div style={{position:'relative', zIndex:1, paddingTop:80, paddingBottom:40, color:'#fff', textAlign:'center'}}>
        <Countdown />
        <h2 style={{fontSize:'2.7rem', fontWeight:900, textShadow:'0 2px 16px #001f3f', letterSpacing:1, fontFamily:'Montserrat, sans-serif'}}></h2>
        <p style={{fontSize:'1.3rem', fontWeight:700, margin:'18px 0 32px 0', textShadow:'0 2px 8px #001f3f88', fontFamily:'Montserrat, sans-serif'}}>
          <em></em>
        </p>
        <ul style={{fontSize:'1.2rem', marginBottom:32, fontWeight:700, color:'#ffc107', textShadow:'0 2px 8px #001f3f88', display:'inline-block', background:'rgba(0,31,63,0.7)', borderRadius:12, padding:'1.2rem 2rem', fontFamily:'Montserrat, sans-serif'}}>
          <li></li>
          <li></li>
        </ul>
        <div style={{textAlign:'center', marginTop:36}}>
          <button className="btn btn-success" style={{fontSize:'1.2rem', padding:'0.8rem 2.2rem', boxShadow:'0 2px 12px #28a74555'}} onClick={onRegister}>
            Register Now
          </button>
          <button className="btn btn-primary" style={{fontSize:'1.1rem', marginLeft:16, background:'#001f3f', color:'#fff', fontWeight:700, borderRadius:8, padding:'0.7rem 1.8rem', boxShadow:'0 2px 12px #001f3f33'}} onClick={onAdmin}>
            Admin
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default Welcome;