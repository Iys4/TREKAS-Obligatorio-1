import React from 'react';
import { Header } from './Header';

export const ScreenLayout = ({ title, showBack, onBack, children, footer }) => (
  <div className="flex-col-full">
    {title && <Header title={title} showBack={showBack} onBack={onBack} />}
    <div className="screen-container">
      {children}
    </div>
    {footer}
  </div>
);
