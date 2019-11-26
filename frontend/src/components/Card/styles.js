import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
  padding-bottom: 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;

  header {
    top: -15px;
    left: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #4f4f4f;
  }

  p {
    border-top: 2px solid #ecf1f8;
    margin-top: 5px;
    font-weight: 500;
    line-height: 20px;
    color: #4f4f4f;
  }

  img {
    width: 24px;
    height: 24px;
    border: 2px solid #4f4f4f;
    border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 2px;
  }

  ${props => props.isDragging && css`
    border: 2px dashed rgba(0, 0, 0, 0.2);
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    cursor: grabbing;
    p, img, header {
      opacity: 0;
    }
  `}
`;