import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #24282b;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a > h1 {
      color: #ecf1f8;
      font-size: 20px;
      border-right: 1px solid #ecf1f8;
      margin-right: 20px;
      padding-right: 20px;

      &:hover {
        color: ${darken(0.1, '#fff')};
      }
    }

    a {
      font-weight: bold;
      color: #ecf1f8;

      &:hover {
        color: ${darken(0.1, '#fff')};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #ecf1f8;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #ecf1f8;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #ecf1f8;

      &:hover {
        color: ${darken(0.2, '#fff')};
      }
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #ecf1f8;
  }
`;
