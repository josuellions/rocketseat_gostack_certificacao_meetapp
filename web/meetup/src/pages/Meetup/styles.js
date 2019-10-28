import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      input {
        background: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #fff;
        margin: 0 0 10px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      textarea{
        background: rgba(0, 0, 0, 0.1);
        height: 100px;
        max-height: 200px;
        max-width: 600px;
        min-height: 100px;
        min-width: 600px;
        padding: 15px;
        border: none;
        margin: 0 0 10px;
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start
      margin: 0 0 10px;
    }

    hr{
      border: 0;
      height: 1px;
      background: rgba(255,255,255,0.2);
      margin-bottom: 10px 0 20px;
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
    justify-content: space-between;
    align-self: flex-end;

    &:hover {
      background: ${darken(0.04, '#f94d6a')};
    }
  }

`;
