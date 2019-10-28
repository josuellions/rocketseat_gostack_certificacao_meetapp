import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { updateMeetupRequest } from '~/store/modules/meetup/actions';

import { Container } from './styles';
import BannerInput from './BannerInput';

export default function Meetup() {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.meetup);

  const [schedule, setSchedule] = useState([]);
  const [scheduleUser, setScheduleUser] = useState([]);
  const [scheduleUrl, setScheduleUrl] = useState('banner');
  const [date, setDate] = useState(new Date());

  // function handleSubmit({ file_id, title, description, locate, date }) {
  function handleSubmit(data) {
    // console.tron.log(data);
    dispatch(updateMeetupRequest(data));
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get(`schedules/${31}`);
      setSchedule(response.data);
      setScheduleUrl(response.data.banner.url);
      setScheduleUser(response.data.user);
      setDate(parseISO(response.data.date));

      // console.tron.log(response);
    }
    loadSchedule();
  }, []);

  // console.tron.log(detail);

  return (
    <Container>
      <Form initialData={schedule} onSubmit={handleSubmit}>
        <BannerInput name={setSchedule.id} />

        <Input name="file_id" type="text" placeholder="Id do banner" />
        <Input name="title" type="text" placeholder="Título do evento meetup" />

        <Textarea
          name="description"
          type="text"
          placeholder="Descrição do evento meetup"
        />

        <Input name="date" type="date" placeholder="yyyy-MM-dd" />

        <Input
          name="locate"
          type="text"
          placeholder="Endereço, número - bairro - SP"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" /> Salvar meetup
        </button>
      </Form>
    </Container>
  );
}
