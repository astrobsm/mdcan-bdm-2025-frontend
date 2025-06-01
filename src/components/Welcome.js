import { useEffect, useState } from 'react';
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
    }, 15000); // 15 seconds
    return () => clearInterval(timer);
  }, [slide, flierUrls.length]);

  return (
    <section
      className="page active"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        minWidth: '100vw',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#001f3f',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          height: 'auto',
          aspectRatio: '3/4',
          margin: '40px auto 24px auto',
          background: '#001f3f',
          borderRadius: 16,
          boxShadow: '0 4px 32px #001f3f55',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {flierUrls.map((url, i) => {
          const isCurrent = i === slide;
          const isPrev = i === prevSlide && transitioning;
          if (!isCurrent && !isPrev) return null;
          return (
            <img
              key={i}
              src={url}
              alt={`Conference Flier ${i + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: isCurrent
                  ? transitioning ? 1 : 1
                  : transitioning ? 1 : 0,
                zIndex: isCurrent ? 2 : 1,
                transform: transitioning
                  ? isCurrent
                    ? 'translateX(100%)'
                    : 'translateX(0%)'
                  : isCurrent
                  ? 'translateX(0%)'
                  : 'translateX(-100%)',
                transition: transitioning
                  ? 'transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s cubic-bezier(.4,2,.6,1)'
                  : 'none',
                filter: 'brightness(0.97)',
                borderRadius: 16,
                background: '#fff',
              }}
            />
          );
        })}
      </div>
      {/* Example buttons below the flier, not obstructed */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <button
          className="btn btn-success"
          style={{
            fontSize: '1.2rem',
            padding: '0.8rem 2.2rem',
            boxShadow: '0 2px 12px #28a74555',
            marginRight: 16,
          }}
          onClick={onRegister}
        >
          Register Now
        </button>
        <button
          className="btn btn-primary"
          style={{
            fontSize: '1.1rem',
            background: '#001f3f',
            color: '#fff',
            fontWeight: 700,
            borderRadius: 8,
            padding: '0.7rem 1.8rem',
            boxShadow: '0 2px 12px #001f3f33',
          }}
          onClick={onAdmin}
        >
          Admin
        </button>
      </div>
    </section>
  );
};

export default Welcome;