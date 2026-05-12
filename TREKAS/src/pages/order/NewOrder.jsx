import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { LOCATIONS, PRODUCTS } from '../../mockData';
import { CartContext } from '../../context/CartContext';

export const NewOrder = () => {
  const { selectedLocation, setSelectedLocation, cart, addItem } = useContext(CartContext);
  const nav = useNavigate();
  const [step, setStep] = useState(1);

  const getQ = id => cart.find(i => i.product.id === id)?.quantity || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header title={step===1 ? "Local" : "Productos"} showBack />
      <div className="screen-container">
        {step === 1 && LOCATIONS.map(l => (
          <div key={l.id} 
               onClick={() => setSelectedLocation(l)}
               style={{ padding: '16px', border: '2px solid', borderColor: selectedLocation?.id === l.id ? 'var(--primary)' : '#ccc', borderRadius: '8px', marginBottom: '12px' }}>
            <h3>{l.name}</h3><p>{l.address}</p>
          </div>
        ))}
        {step === 2 && PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'white', borderRadius: '8px', marginBottom: '12px', border: '1px solid #ccc' }}>
            <div>
              <h3>{p.name}</h3><p style={{color: 'var(--primary)', fontWeight: 'bold'}}>${p.price}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{width:'40px',height:'40px', background:'var(--primary)', color:'white', borderRadius:'8px', border:'none'}} onClick={()=>getQ(p.id)>0 && addItem(p, getQ(p.id)-1)}>-</button>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>{getQ(p.id)}</span>
              <button style={{width:'40px',height:'40px', background:'var(--primary)', color:'white', borderRadius:'8px', border:'none'}} onClick={()=>addItem(p, getQ(p.id)+1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #ccc' }}>
        <PrimaryButton title="CONTINUAR" disabled={step===1 ? !selectedLocation : cart.length===0} onClick={() => { step===1 ? setStep(2) : nav('/order/cart') }} />
      </div>
    </div>
  );
};