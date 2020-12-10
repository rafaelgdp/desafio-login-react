import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './RegisterPage.css';
import api from "../../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {

  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState(new Date());
  const [naturalidade, setNaturalidade] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");

  function validateForm() {
    return true;
  }

  function notificarSucesso(msg) {
    toast.success(msg);
  }
  
  function notificarErro(msg) {
    toast.error(msg);
  }
  

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      nome,
      sexo,
      email,
      nascimento,
      naturalidade,
      nacionalidade,
      cpf,
      senha
    };
    
    api.post('/api/user/registrar', user)
    .then((res) => {
      notificarSucesso('Usuário cadastrado com sucesso!');
    }).catch((error) => {
      if (error.response.data) notificarErro(error.response.data);
    })
  }

  return (
    <div className="Login">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
      <h3 id="titulo">Tela de Registro</h3>
      <Form.Group size="lg" controlId="nome">
          <Form.Label>Nome<span>*</span></Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            autocomplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="sexo">
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            as="select"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option>Não Informado</option>
            <option>Masculino</option>
            <option>Feminino</option>
          </Form.Control>
        </Form.Group>
        <Form.Group size="lg" controlId="nascimento">
          <Form.Label>Nascimento<span>*</span></Form.Label>
          <Form.Control
            autoFocus
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="naturalidade">
          <Form.Label>Naturalidade</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={naturalidade}
            onChange={(e) => setNaturalidade(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="nacionalidade">
          <Form.Label>Nacionalidade</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="cpf">
          <Form.Label>CPF<span>*</span></Form.Label>
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
        <Button block size="lg" variant="primary" type="submit" disabled={!validateForm()}>
          Registrar
        </Button>
      </Form>
    </div>
  );
}