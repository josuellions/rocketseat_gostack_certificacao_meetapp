import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 600px;
      height: 260px;
      max-width: 600px;
      max-height: 260px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: ${darken(0.08, '#25212f')};
    }

    input {
      display: none;
    }
  }
`;
