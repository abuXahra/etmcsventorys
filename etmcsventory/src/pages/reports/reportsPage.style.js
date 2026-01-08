import styled from "styled-components";

export const ReportsPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const ReportsPageContent = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  border-radius: 2px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ItemWrapper = styled.div`
  width: 23.4%;
  height: 100px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
  background-color: ${({ bg }) => bg};
  color: white;
  padding: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  /* background-color: #00032a; */
  height: 50px;
  width: 50px;
  color: #ffffff5d;
  border-radius: 5px;
  img {
    height: 30px;
  }
`;

export const ItemTitleStyle = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
export const ItemDetails = styled.div`
  padding: 5px;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
`;

export const ArrowWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(204, 204, 204, 0.69);
  border-radius: 100%;
`;
