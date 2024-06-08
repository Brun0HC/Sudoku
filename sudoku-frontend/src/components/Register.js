import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    const response = await fetch('http://localhost:5000/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.status === 201) {
      navigate("/login");
    } else {
      const errorMessage = await response.text();
      alert(errorMessage);
      console.error(response.status);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn-submit">Cadastrar</button>
        <a href='/login'>Entrar</a>
      </form>
    </div>
  );
};

export default Register;
