import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import {
  MdAddCircleOutline,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  SelectDate,
  EventsMeetups,
  EventMeetup,
  Footer,
} from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const selectDateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function dateFormatted(dt) {
    const dateFormat = format(parseISO(dt), "d 'de' MMMM, ', às 'HH:mm", {
      locale: pt,
    });

    return dateFormat;
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedules', {
        params: { date, page: 1 },
      });
      setSchedule(response.data);
    }
    loadSchedule();
  }, [date]);

  return (
    <>
      <Container>
        <header>
          <h1>Meus Meetups</h1>
          <Link to="/meetup/0">
            <MdAddCircleOutline size={20} color="#fff" /> Novo meetup
          </Link>
        </header>
        <SelectDate>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={24} color="#fff" />
          </button>
          <strong>{selectDateFormatted}</strong>
          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={24} color="#fff" />
          </button>
        </SelectDate>
        <EventsMeetups>
          <ul>
            {schedule.map(item => (
              <EventMeetup key={item.id}>
                <strong>{item.title}</strong>
                <span>{dateFormatted(item.date)}</span>
                <Link to={`detail/${item.id}`}>
                  <MdChevronRight size={20} color="#fff" />
                </Link>
              </EventMeetup>
            ))}
          </ul>
        </EventsMeetups>
        <Footer noEvent>
          <button type="submit">
            <MdChevronLeft size={24} color="#fff" />
          </button>
          <strong>1</strong>
          <button type="submit">
            <MdChevronRight size={24} color="#fff" />
          </button>
        </Footer>
      </Container>
    </>
  );
}
