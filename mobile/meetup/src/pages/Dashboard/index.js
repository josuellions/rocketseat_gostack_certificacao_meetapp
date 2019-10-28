import React, { useEffect, useState, useMemo } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import HeaderCustom from '~/components/Header';
import Meetups from '~/components/Meetups';

import { Container, SelectDate, Time, SelectPage, TPage, List } from './styles';

function Dashboard({ isFocused, navigation }) {
  const [page = 1, setPage] = useState();
  const [meetups, setMeetups] = useState();
  const [date, setDate] = useState(new Date());

  // Recarreganeto da pagina, quando retorna de outra view
  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get(`events/`, {
        params: {
          date,
          page,
        },
      });
      setMeetups(response.data);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date, page]);

  async function handleSubscription(id) {
    await api.post(`subscriptions/${id}`);
    navigation.navigate('Subscriptions');
  }

  const selectDateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <Background>
      <HeaderCustom />
      <Container>
        <SelectDate>
          <RectButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </RectButton>
          <Time>{selectDateFormatted}</Time>
          <RectButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={20} color="#fff" />
          </RectButton>
        </SelectDate>

        <SelectPage>
          <RectButton onPress={handlePrevPage}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </RectButton>
          <TPage>{page}</TPage>
          <RectButton onPress={handleNextPage}>
            <Icon name="chevron-right" size={20} color="#fff" />
          </RectButton>
        </SelectPage>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetups
              onSubscription={() => handleSubscription(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
