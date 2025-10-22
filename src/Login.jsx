// Login.jsx
import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', usuario);
    console.log('Contraseña:', contrasena);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Formulario de Login */}
        <div className="login-box">
          {/* Icono de Candado */}
          <div className="lock-icon-container">
            <div className="lock-icon">
              🔓
            </div>
          </div>

          <div className="login-form">
            {/* Campo Usuario */}
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="input-group">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Botón Iniciar Sesión */}
            <button onClick={handleSubmit} className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}