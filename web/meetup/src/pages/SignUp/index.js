import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logomeetuptansp48x48.png';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('* Campo nome é obrigatório'),
  email: Yup.string()
    .email('* Digite um email válido')
    .required('* Campo e-mail é obrigatório'),
  password: Yup.string()
    .min(6, '* A senha dever ter no mínimo 6 caracteres')
    .required('* Campo senha é obrigatório'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo Meetup" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input type="text" name="name" placeholder="Seu nome completo" />
        <Input type="email" name="email" placeholder="seuemail@dominio.com" />
        <Input type="password" name="password" placeholder="digite sua senha" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Criar Conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
