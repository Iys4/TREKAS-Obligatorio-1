import React from 'react';
import { useNavigate } from 'react-router-dom';
export const Header = ({ title, showBack }) => {
  const nav = useNavigate();
  return (
    <header className="header">
      {showBack && <button className="back-btn" onClick={() => nav(-1)}>VOLVER</button>}
      <span className="header-title">{title}</span>
    </header>
  );
};