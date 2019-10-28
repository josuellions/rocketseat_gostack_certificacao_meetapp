import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  item-align: center;
  position: relative;
`;

export const Badge = styled.button`
  position: relative;
  background: none;
  border: 0;

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationsList = styled.div`
  position: absolute;
  width: 265px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: #18161f;
  border-radius: 4px;
  padding: 15px 5px;
  color: #fff;
  display: ${props => (props.visible ? 'block' : 'none')}

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #18161f;

  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.3, '#18161f')};
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        margin-left: 10px;
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
      }
    `}
`;
