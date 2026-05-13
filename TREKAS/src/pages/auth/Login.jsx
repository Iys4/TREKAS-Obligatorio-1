import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const Login = ({ login }) => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try { await login(email, pass); nav('/'); }
    catch(e) { setError(e.message); }
  };
  return (
    <div className="screen-container flex-col-full" style={{ justifyContent: 'center' }}>
      <h1 className="text-center text-primary mb-1">TREKAS Delivery</h1>
      <p className="text-center mb-5">Ingreso Operarios</p>
      <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input label="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} error={error} />
      <div className="mb-4"></div>
      <PrimaryButton title="INGRESAR" onClick={handleLogin} />
      <PrimaryButton title="REGISTRARSE" outline onClick={() => nav('/register')} />
    </div>
  );
};