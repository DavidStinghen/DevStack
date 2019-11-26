import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  width: 340px;
  opacity: ${props => (props.done ? 0.6 : 1)};
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  position: relative;
  max-height: 100%;
`;

export const Header = styled.header`
  position: fixed:
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;

  h1 {
    font-weight: bold;
    font-size: 16px;
    padding: 0 10px;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 95%;
  padding: 5px 25px;

  ul {
    margin-top: 30px;
    height: 100% !important;
  }
`;
