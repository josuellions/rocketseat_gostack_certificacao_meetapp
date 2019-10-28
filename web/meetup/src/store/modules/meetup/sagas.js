import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateMeetupSuccess, updateMeetupFailure } from './actions';

export function* updateMeetup({ payload }) {
  try {
    const { id, file_id, title, description, locate } = payload.data;

    const response = yield call(api.put, `events/${id}`, {
      file_id,
      title,
      description,
      locate,
      date: '2020-10-23T06:00:00-03:00',
    });

    toast.success('Sucess: Meetup atualizado com sucesso!');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    console.tron.error(err);
    toast.error('Falha: Informações inválidas, verifique os dados!');

    yield put(updateMeetupFailure());
  }
}

export default all([takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup)]);
