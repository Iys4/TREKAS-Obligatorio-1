import React from 'react';
import { Card } from './Card';

export const LocationHeaderCard = ({ locationInfo, fallbackName }) => {
  if (locationInfo) {
    return (
      <Card 
        title={locationInfo.name} 
        titleClassName="text-primary mb-1" 
        className="card-padded" 
        style={{ borderLeft: '6px solid var(--primary)' }}
      >
        <p className="text-muted m-0">{locationInfo.address}</p>
      </Card>
    );
  }

  return (
    <Card className="card-padded text-center">
      <h2 className="m-0">{fallbackName}</h2>
    </Card>
  );
};
