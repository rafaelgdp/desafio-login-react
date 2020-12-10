import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api from "../../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {

  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");

  function notificarSucesso(msg) {
    toast.success(msg);
  }
  
  function notificarErro(msg) {
    toast.error(msg);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      cpf,
      senha
    };

    api.post('/api/user/login', user)
    .then((res) => {
      notificarSucesso('Login realizado com sucesso!');
      localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        window.location = '/profile'
      }, 500);
    }).catch((error) => {
      if (error.response.data) notificarErro(error.response.data);
    })
  }

  return (
    <div className="Login">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" variant="primary" type="submit">
          Logar
        </Button>
      </Form>
    </div>
  );
}