import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import HeaderCustom from '~/components/Header';
import SubscriptionsList from '~/components/SubscriptionsList';

import { Container, Time, List } from './styles';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('subscriptions');

    setMeetups(response.data);
  }

  // Recarreganeto da pagina, quando retorna de outra view
  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    // const response =
    await api.delete(`subscriptions/${id}`);
    loadMeetups();
    /* setMeetups(
      SubscriptionsList.map(meetup =>
        meetup.id === id
          ? {
              ...meetups,
              canceled_at: response.data.canceled_at,
            }
          : meetups,
      ),
    ); */
  }

  return (
    <Background>
      <HeaderCustom />
      <Container>
        <Time> Minhas Incrições Meetups </Time>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <SubscriptionsList
              onCancel={() => handleCancel(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
