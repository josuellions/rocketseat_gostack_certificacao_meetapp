import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`

  max-width: 900px;
  margin: 50px auto;
  color: #fff;

  display: flex;
  flex-direction: column;

  header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    > a {
      border: 0;
      height: 44px;
      padding: 0 15px;
      font-size: 16px;
      margin: 5px 0 0;
      border-radius: 4px;
      background: #f94d6a;
      color: rgba(255, 255, 255, 0.7);
      transition: : background 0.2s;

      width: 160px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
  }
`;

export const SelectDate = styled.div`
  display: flex;
  align-self: center;
  align-items: center;

  strong {
    font-size: 24px;
  }

  button {
    border: 0;
    background: none;
    margin: 0 15px;
  }
`;

export const EventsMeetups = styled.div`
  min-height: 380px;
  height: auto;

  display: flex;
  flex-direction: column;

  ul {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
  }
`;
export const EventMeetup = styled.li`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: space-between;

  align-items: center;
  background: ${lighten(0.01, '#25212f')};

  strong {
    width: 700px;
    max-width: 680px;
    font-size: 20px;
    font-weight: normal;
  }

  span {
    width: 180px;
    max-width: 200px;
    font-size: 12px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.3);
  }

  a {
    width: 20px;
    max-width: 20px;
    font-weight: normal;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;

  strong {
    font-size: 24px;
  }

  button {
    border: 0;
    background: none;
    margin: 0 15px;
  }
`;
