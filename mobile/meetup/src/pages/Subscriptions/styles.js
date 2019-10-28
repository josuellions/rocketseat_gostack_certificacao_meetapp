import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  z-index: 0;
`;
export const HeaderCustom = styled.View`
  flex: 1;
  align-self: center;
  align-items: center;
  background-color: #18161f;
  height: 64px;
  max-height: 64px;
  margin-top: 0;
  padding: 4px;
`;

export const Time = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
