import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = ({ title, showBack, onBack }) => {
  const nav = useNavigate();
  return (
    <header className="header">
      {showBack && (
        <button className="back-btn" onClick={onBack || (() => nav(-1))}>
          VOLVER
        </button>
      )}
      <span className="header-title">{title}</span>
    </header>
  );
};