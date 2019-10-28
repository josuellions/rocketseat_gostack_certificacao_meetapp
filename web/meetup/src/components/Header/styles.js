import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #18161f;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    aling-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #fff;
    }
  }
  aside {
    display: flex;
    aling-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  color: #fff;

  div {
    text-aling: rigth;
    margin-right: 10px;

    strong {
      display: flex;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      text-align: right;
      color: #999;
    }
  }

  button {
    height: 32px;
    width: 56px;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    background: #f94d6a;
    color: rgba(255, 255, 255, 0.7);
    transition: : background 0.2s;

    &:hover {
      background: ${darken(0.04, '#f94d6a')};
    }
  }
`;
