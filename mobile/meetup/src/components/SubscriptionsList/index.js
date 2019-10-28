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

export default function SubscriptionsList({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.eventsmeetups.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.eventsmeetups.date]);

  return (
    <Container past={data.past}>
      <Banner
        source={{
          uri: data.eventsmeetups.banner
            ? data.eventsmeetups.banner.url
            : `${banner}`,
        }}
      />
      <Left>
        <Info>
          <TTitle>{data.eventsmeetups.title}</TTitle>
          <Time>
            <Icon name="event" size={20} color="#999" />
            {dateParsed}
          </Time>
          <Locale>
            <Icon name="add-location" size={20} color="#999" />
            {data.eventsmeetups.locate}
          </Locale>
          <Organizator>
            <Icon name="person" size={20} color="#999" />
            Organizador: {data.eventsmeetups.user.name}
          </Organizator>

          {!data.cancelable && (
            <SubmitButton onPress={onCancel}>
              <Text>Cancelar inscrição</Text>
            </SubmitButton>
          )}
        </Info>
      </Left>
    </Container>
  );
}
