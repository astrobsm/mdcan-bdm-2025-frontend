import { useEffect, useState } from 'react';
import Countdown from './Countdown';
const flierUrls = [
  process.env.PUBLIC_URL + '/flier1.jpg',
  process.env.PUBLIC_URL + '/flier2.jpg',
  process.env.PUBLIC_URL + '/flier3.jpg', // Ensure this file exists
];

const Welcome = ({ onRegister, onAdmin }) => {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Slideshow logic with right-to-left fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(slide);
      setTransitioning(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % flierUrls.length);
        setTransitioning(false);
      }, 700); // transition duration
    }, 4000);
    return () => clearInterval(timer);
  }, [slide, flierUrls.length]);

  return (
    <section className="page active" style={{position:'relative', overflow:'hidden', minHeight: '100vh', padding:0, display:'flex'}}>
      {/* Flier slideshow background (occupies left half) */}
      <div style={{
        position: 'relative',
        width: '50vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#001f3f',
        flexShrink: 0,
      }}>
        {flierUrls.map((url, i) => {
          // Determine if this is the current or previous slide
          const isCurrent = i === slide;
          const isPrev = i === prevSlide && transitioning;
          // Only render current and previous slides for performance
          if (!isCurrent && !isPrev) return null;
          return (
            <img
              key={i}
              src={url}
              alt={`Conference Flier ${i+1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isCurrent
                  ? transitioning ? 1 : 1
                  : transitioning ? 1 : 0,
                zIndex: isCurrent ? 2 : 1,
                // Animate right-to-left fade
                transform: transitioning
                  ? (isCurrent
                      ? 'translateX(100%)'
                      : 'translateX(0%)')
                  : (isCurrent ? 'translateX(0%)' : 'translateX(-100%)'),
                transition: transitioning
                  ? 'transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s cubic-bezier(.4,2,.6,1)'
                  : 'none',
                filter: 'brightness(0.85) blur(0.5px)',
              }}
            />
          );
        })}
      </div>
      {/* Content overlay (occupies right half) */}
      <div style={{
        position:'relative',
        zIndex:1,
        paddingTop:80,
        paddingBottom:40,
        color:'#fff',
        textAlign:'center',
        width: '50vw',
        minHeight: '100vh',
        background: 'linear-gradient(90deg, rgba(0,31,63,0.7) 0%, rgba(0,31,63,1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Countdown />
        <h2 style={{fontSize:'2.7rem', fontWeight:900, textShadow:'0 2px 16px #001f3f', letterSpacing:1, fontFamily:'Montserrat, sans-serif'}}>
          MDCAN 2024 Annual Conference
        </h2>
        <p style={{fontSize:'1.3rem', fontWeight:700, margin:'18px 0 32px 0', textShadow:'0 2px 8px #001f3f88', fontFamily:'Montserrat, sans-serif'}}>
          <em>SUB-THEMES:
 Medical Migration Syndrome (Japa): Fortunes and Misfortunes
Physician heal thyself: The mismatch between knowledge and practice</em>
        </p>
        <ul style={{fontSize:'1.2rem', marginBottom:32, fontWeight:700, color:'#ffc107', textShadow:'0 2px 8px #001f3f88', background:'rgba(0,31,63,0.7)', borderRadius:12, padding:'1.2rem 2rem', fontFamily:'Montserrat, sans-serif'}}>
          <li>Medical Migration Syndrome (Japa): Fortunes and Misfortunes</li>
          <li>Physician heal thyself: The mismatch between knowledge and practice</li>
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