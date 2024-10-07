import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await fetchRegister({ nombre, email, password });
      navigate('/auth/login');
    } catch (error) {
      setErrorMessage("Este correo electrónico ya está registrado.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/auth/login");
  };

  return (
    <div style={styles.container}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Introduce tu nombre"
          required
          style={styles.input}
        />

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce tu correo"
          required
          style={styles.input}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Introduce tu contraseña"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Registrarse</button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </form>

      <p>¿Ya tienes una cuenta?</p>
      <button onClick={handleLoginRedirect} style={styles.registerButton}>
        Iniciar sesión
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  registerButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  }
};

export default Register;
