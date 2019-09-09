import styled from 'styled-components';

export const ScrollableContainer = styled.div<{ count: number }>`
  display: flex;
  min-height: 90vh;
  min-width: ${props => props.count * 100}vw;
`;

export const ScrollableContent = styled.div`
  width: 100%;
  height: 100%;
`;
