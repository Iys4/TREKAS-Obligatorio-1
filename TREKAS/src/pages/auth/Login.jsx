import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const Login = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try { await login(email, pass); nav('/'); }
    catch(e) { setError(e.message); }
  };
  return (
    <div className="screen-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '8px' }}>TREKAS Delivery</h1>
      <p style={{ textAlign: 'center', marginBottom: '32px' }}>Ingreso Operarios</p>
      <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input label="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} error={error} />
      <div style={{ height: '24px' }}></div>
      <PrimaryButton title="INGRESAR" onClick={handleLogin} />
      <PrimaryButton title="REGISTRARSE" outline onClick={() => nav('/register')} />
    </div>
  );
};