import React from 'react';

export const AuthHeader = ({ title, subtitle }) => (
  <>
    <h1 className="text-center text-primary mb-1">{title}</h1>
    <p className="text-center mb-5">{subtitle}</p>
  </>
);
