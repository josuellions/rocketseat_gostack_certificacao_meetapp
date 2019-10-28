import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite Seu Nome Completo" />
        <Input
          name="email"
          type="email"
          placeholder="seuemail@dominio.com.br"
        />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Digite sua senha atual"
        />

        <Input
          name="password"
          type="password"
          placeholder="Digite sua nova senha"
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" /> Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
