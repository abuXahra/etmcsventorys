import styled from "styled-components";

export const EditSalesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const EditSalesContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ItemsWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CustomerInfoWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 2px solid grey;
  border-radius: 2px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectItemContent = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 2px;
  border-top: 2px solid grey;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemListContent = styled.div`
  width: 100%;
  background-color: white;
  border-top: 2px solid grey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AnyItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || ""};
  gap: ${({ gap }) => gap || "20px"};
  font-size: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableStyled = styled.table`
  width: 100%;
  padding: ${({ pd }) => pd || "20px"};
  font-size: 11px;
  color: rgb(27, 27, 27);

  tr:nth-child(even) {
    background-color: rgba(210, 210, 210, 0.24);
  }
`;

export const TdStyled = styled.td`
  padding: ${({ rowPd }) => rowPd || "10px"};
  span {
    width: 100%;
    padding: 5px;
    color: red;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const HrStyled = styled.div`
  border-top: 1px solid #0d398420;
`;

export const TotalChargesWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const InnerWrapper = styled.div`
  background-color: ${({ bgColor }) => bgColor || "rgba(186, 186, 186, 0.07)"};
  padding: ${({ pd }) => pd || "10px"};
  width: ${({ wd }) => wd || "45%"};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
