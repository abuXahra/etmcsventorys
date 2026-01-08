import styled from "styled-components";

export const ItemContainerS = styled.div`
  width: 100%;
  /* gap: 20px; */
  background-color: white;
  /* border-top: ${({ borderTop }) => borderTop || "2px solid grey"}; */
  border-radius: 2px;
  padding: 20px 5px 5px 5px;
`;

export const ItemContent = styled.div`
  border: 1.5px solid #cccccc8c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  padding: 5px;
  padding-top: 25px;
`;

export const ItemTitleWrapper = styled.div`
  border: 1.5px solid #cccccc8c;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 5px;
  font-size: bold;
  top: -12px;
  left: 3px;
  background-color: white;
  border-radius: 10px;
`;

export const ItemButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: ${({ btnAlign }) => btnAlign || "flex-start"};
`;
