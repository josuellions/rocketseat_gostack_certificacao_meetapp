import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import banner from '~/assets/logomeetuptansp36x36.png';
import {
  Container,
  Left,
  Banner,
  Info,
  TTitle,
  Time,
  Locale,
  Organizator,
  SubmitButton,
} from './styles';

export default function Meetups({ data, onSubscription }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Banner
        source={{
          uri: data.banner ? data.banner.url : `${banner}`,
        }}
      />
      <Left>
        <Info>
          <TTitle>{data.title}</TTitle>
          <Time>
            <Icon name="event" size={20} color="#999" />
            {dateParsed}
          </Time>
          <Locale>
            <Icon name="add-location" size={20} color="#999" />
            {data.locate}
          </Locale>
          <Organizator>
            <Icon name="person" size={20} color="#999" />
            Organizador: {data.user.name}
          </Organizator>

          {!data.canceled_at && (
            <SubmitButton onPress={onSubscription}>
              <Text>Realizar inscrição</Text>
            </SubmitButton>
          )}
        </Info>
      </Left>
    </Container>
  );
}
