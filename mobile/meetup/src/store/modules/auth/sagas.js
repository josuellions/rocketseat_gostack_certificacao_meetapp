import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // enviando requisições authenticadas para server BD
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // Efeito teste de carregamento dados vindo do server, somente para teste
    yield delay(3000); // remover quando produção

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Senha ou email invalido, tente novamente'
    );
    yield put(signFailure());
  }
}

/** CADASTRO NOVO USUÀRIO */
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'verifique seus dados!');

    yield put(signFailure());
  }
}

/** Função para refresh ou F5 de paginas */
export function setToken({ payload }) {
  // console.log(payload);
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
