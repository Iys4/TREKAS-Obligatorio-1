import React from 'react';
import { usarFormularioDeRegistro } from './usarFormularioDeRegistro';
import { InputUI } from '../../../components/ui/InputUI';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { ContenedorAuthUI } from '../../../components/ui/ContenedorAuthUI';
import { HeaderAuthUI } from '../../../components/ui/HeaderAuthUI';

//Pantalla de Registrarse, esta es la parte visual, envia los props a usarFormularioDeRegistro

export const Register = ({ register }) => {
  const {
    email,
    actualizarEmail,
    pass,
    actualizarContrasena,
    passConfirm,
    actualizarContrasenaConfirm,
    error,
    validarYRegistrar,
    navigateToLogin,
  } = usarFormularioDeRegistro({ register });

  return (
    <ContenedorAuthUI>
      <HeaderAuthUI title="TREKAS Delivery" subtitle="Registro de Operarios" />
      <InputUI label="Email" type="email" value={email} onChange={e => actualizarEmail(e.target.value)} />
      <InputUI label="Contraseña" type="password" value={pass} onChange={e => actualizarContrasena(e.target.value)} />
      <InputUI label="Confirmar Contraseña" type="password" value={passConfirm} onChange={e => actualizarContrasenaConfirm(e.target.value)} error={error} />
      <div className="mb-4"></div>
      <BotonPrincipalUI title="REGISTRARSE" onClick={validarYRegistrar} />
      <BotonPrincipalUI title="VOLVER AL LOGIN" outline onClick={navigateToLogin} />
    </ContenedorAuthUI>
  );
};
