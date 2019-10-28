import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 14px;
  padding: 0px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  justify-content: space-between;
`;
export const Banner = styled.Image`
  width: 100%;
  height: 130px;
  background: #999;
`;
export const Info = styled.View`
  margin-top: 10px;
  margin-left: 15px;
`;

export const TTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const Time = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  color: #999;
`;

export const Locale = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #999;
`;
export const Organizator = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #999;
`;
export const SubmitButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 260px;
`;
