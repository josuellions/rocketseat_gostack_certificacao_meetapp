import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import Notifications from '~/components/Notifications';

import logo from '~/assets/logomeetuptansp36x36.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo Meetup" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile"> Meu perfil</Link>
            </div>
            <button type="button" onClick={handleSubmit}>
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
