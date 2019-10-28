import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import { MdDeleteSweep, MdCreate, MdEvent, MdPlace } from 'react-icons/md';
import history from '~/services/history';

import api from '~/services/api';

import { Container, Banner, Information } from './styles';

export default function Detail() {
  const detail = useSelector(state => state.meetup.datameetup);

  const [schedule, setSchedule] = useState([]);
  const [scheduleUser, setScheduleUser] = useState([]);
  const [scheduleUrl, setScheduleUrl] = useState('banner');
  const [date, setDate] = useState(new Date());

  function selectDateFormatted() {
    return format(date, "d 'de' MMMM", { locale: pt });
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get(`schedules/${31}`);
      setSchedule(response.data);
      setScheduleUrl(response.data.banner.url);
      setScheduleUser(response.data.user);
      setDate(parseISO(response.data.date));
    }
    loadSchedule();
  }, []);

  async function handleDelete() {
    // dispatch(updateMeetupRequest(id));
    await api.delete(`events/${schedule.id}`);
    history.push('/');
  }

  return (
    <Container initial={detail}>
      <header>
        <h1>{schedule.title}</h1>
        <Link to={`/meetup/${schedule.id}`}>
          <MdCreate size={20} color="#fff" /> Editar
        </Link>
        <button type="button" onClick={handleDelete}>
          <MdDeleteSweep size={20} color="#fff" /> Cancelar
        </button>
      </header>
      <Banner>
        <img src={scheduleUrl} alt="Imagem banner meetup" />
      </Banner>
      <Information>
        <strong>{schedule.description}</strong>
        <p>
          Caso queira participar como palestrante do meetup envie um e-mail para
          <strong> {scheduleUser.email}</strong>.
        </p>
        <aside>
          <p>
            <MdEvent size={20} color="#fff" />
            {selectDateFormatted()}
          </p>
          <p>
            <MdPlace size={20} color="#fff" />
            {schedule.locate}
          </p>
        </aside>
      </Information>
    </Container>
  );
}
