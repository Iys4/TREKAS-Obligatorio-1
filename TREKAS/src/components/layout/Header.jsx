import React from 'react';
import { useNavigate } from 'react-router-dom';
import trekasLogo from '../../assets/img/logos/negro.png';

export const Header = ({ title, showBack, onBack }) => {
  const nav = useNavigate();
  return (
    <header className="header">
      {showBack && (
        <button className="back-btn" onClick={onBack || (() => nav(-1))}>
          ←
        </button>
      )}
      <img src={trekasLogo} alt={title || 'TREKAS'} className="header-logo" />
    </header>
  );
};