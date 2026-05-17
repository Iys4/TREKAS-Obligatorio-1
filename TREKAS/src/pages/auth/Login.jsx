//Importa los componentes de UI (como input) de la carpeta de UI
//Esta pagina tiene los componentes de la pantalla de login
import React from 'react';
//useLoginForm es la logica del login
import { useLoginForm } from '../../hooks/useLoginForm';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AuthContainer } from '../../components/ui/AuthContainer';
import { AuthHeader } from '../../components/ui/AuthHeader';

//Llama a useLoginForm y le pide que la informacion que necesita mostrarle al usuario ademas de llamar a la autorizacion necesaria en authservice.
export const Login = ({ login }) => {
  const {
    email,
    setEmail,
    pass,
    setPass,
    error,
    handleLogin,
    navigateToRegister,
  } = useLoginForm({ login });

//Este es el HTML que se va a mostrar en la pagina, con el control de comportamiento que se usa en useLoginForm
  return (
    <AuthContainer>
      <AuthHeader title="TREKAS Delivery" subtitle="Ingreso Operarios" />
      <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input label="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} error={error} />
      <div className="mb-4"></div>
      {/* Llama a handleLogin en useLoginForm y luego inicia el proceso de autorizacion */}
      <PrimaryButton title="INGRESAR" onClick={handleLogin} />
      <PrimaryButton title="REGISTRARSE" outline onClick={navigateToRegister} />
    </AuthContainer>
  );
};