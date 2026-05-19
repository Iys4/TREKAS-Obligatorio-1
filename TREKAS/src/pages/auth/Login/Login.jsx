//Importa los componentes de UI (como input) de la carpeta de UI
//Esta pagina tiene los componentes de la pantalla de login
import React from 'react';
//usarFormularioDeLogin es la logica del login
import { usarFormularioDeLogin } from './usarFormularioDeLogin';
import { InputUI } from '../../../components/ui/InputUI';
import { BotonPrincipalUI } from '../../../components/ui/BotonPrincipalUI';
import { ContenedorAuthUI } from '../../../components/ui/ContenedorAuthUI';
import { HeaderAuthUI } from '../../../components/ui/HeaderAuthUI';

//Llama a usarFormularioDeLogin y le pide que la informacion que necesita mostrarle al usuario ademas de llamar a la autorizacion necesaria en authservice.
export const Login = ({ login }) => {
  const {
    email,
    actualizarEmail,
    pass,
    actualizarContraseña,
    error,
    erroresLogin,
    navigateToRegister,
  } = usarFormularioDeLogin({ login });

  //Este es el HTML que se va a mostrar en la pagina, con el control de comportamiento que se usa en usarFormularioDeLogin
  return (
    <ContenedorAuthUI>
      <HeaderAuthUI title="TREKAS Delivery" subtitle="Ingreso Operarios" />
      <InputUI label="Email" type="email" value={email} onChange={e => actualizarEmail(e.target.value)} />
      <InputUI label="Contraseña" type="contraseña" value={pass} onChange={e => actualizarContraseña(e.target.value)} error={error} />
      <div className="mb-4"></div>
      {/* Llama a erroresLogin en usarFormularioDeLogin y luego inicia el proceso de autorizacion */}
      <BotonPrincipalUI title="INGRESAR" onClick={erroresLogin} />
      <BotonPrincipalUI title="REGISTRARSE" outline onClick={navigateToRegister} />
    </ContenedorAuthUI>
  );
};
