import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.status===200) {
        const data = await response.json();
        console.log(data)
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        console.error('Erro ao fazer login:', response.statusText);
      }
    } catch (error) {
      alert(error);
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form"> 
        <div className="form-group"> 
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" /> 
        </div>
        <div className="form-group"> 
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} className="form-control" /> 
        </div>
        <button type="submit" className="btn-submit">Entrar</button> 
        <a href='/register'>Registrar-se</a>
      </form>
    </div>
  );
};

export default Login;
