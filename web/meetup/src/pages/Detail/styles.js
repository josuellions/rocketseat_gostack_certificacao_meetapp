import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #fff;

    h1{
      width: 540px;
    }

    a {
      border: 0;
      height: 44px;
      padding: 0 15px;
      font-size: 16px;
      margin: 5px 0 0;
      border-radius: 4px;
      background: #5ea4fb;
      color: rgba(255, 255, 255, 0.7);
      transition: : background 0.2s;

      width: 160px;
      display: flex;
      justify-content: center;
      align-items: center;

        &:hover {
          background: ${darken(0.04, '#5ea4fb')};
        }
      }

      button {
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
      justify-content: center;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }

  }
  `;

export const Information = styled.div`
  display: block;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;

  height: 160px;
  max-height: 160px;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 15px;

  strong {
    font-weight: normal;
  }

  aside {
    display: flex;
    > p {
      display: flex;
      justify-content: center;
      align-self: flex-end;
      padding-right: 40px;
    }
  }
`;

export const Banner = styled.div`
  width: 100%;
  height: 380px;
  max-height: 380px;
  margin-top: 40px;
  background: ${darken(0.08, '#25212f')};

  img {
    width: 100%;
    height: 100%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    background: ${darken(0.08, '#25212f')};
  }
`;
