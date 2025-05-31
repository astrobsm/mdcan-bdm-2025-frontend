import React from 'react';

const Navigation = ({ onNav, delegateEnabled }) => (
  <nav>
    <button className="btn btn-primary" onClick={() => onNav('welcome')}>Welcome</button>
    <button className="btn btn-accent" onClick={() => onNav('registration')}>Registration</button>
    <button className="btn btn-success" onClick={() => onNav('delegate')} disabled={!delegateEnabled}>Delegate Details</button>
  </nav>
);

export default Navigation;
