import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  max-width: ${({ tbWidth }) => tbWidth || "100%"};
  /* margin: 0 auto; */
  /* padding: 20px; */
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  padding: 20px;
  overflow-x: auto; /* Enable horizontal scrolling if necessary */
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
`;

export const ActionButton = styled.button`
  /* padding: 4px 8px; */
  border: none;
  color: ${({ clr }) => clr || "green"};
  cursor: pointer;
  background-color: transparent;
  font-size: 10px;

  /* &:hover {
    opacity: 0.8;
  } */
`;

export const ActionText = styled.span`
  width: 100px;
  padding: 3px;
  background-color: #383838ff;
  color: #767676ff;
  position: absolute;
  bottom: -22px;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 10px;
  border: 0.5px solid #cccccc;
  z-index: 999;
  font-size: 10px;
`;

export const SlideUpButton = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: slideUp 0.4s ease;
  z-index: 1000;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;
