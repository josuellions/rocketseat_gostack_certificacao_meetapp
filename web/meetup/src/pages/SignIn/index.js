import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logomeetuptansp48x48.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('* Digite um email válido')
    .required('* Campo e-mail é obrigatório'),
  password: Yup.string().required('* Campo senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Logo Meetup" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input type="email" name="email" placeholder="seuemail@dominio.com" />
        <Input type="password" name="password" placeholder="digite sua senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
        <Link to="/register">Criar conta grátis</Link>
      </Form>
    </>
  );
}
