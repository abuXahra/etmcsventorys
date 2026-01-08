import styled from "styled-components";

export const AddWastageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const AddWastageContent = styled.div`
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

export const SupplierInfoWrapper = styled.div`
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
  position: relative;
  flex-direction: ${({ flxDirection }) => flxDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || ""};
  gap: ${({ gap }) => gap || "20px"};
  font-size: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableResponsiveWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    -webkit-overflow-scrolling: touch;
  }
`;
export const TableStyled = styled.table`
  width: 100%;
  /* padding: ${({ pd }) => pd || "20px"}; */
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
  margin-top: 30px;
  border-top: 1px solid #0d398420;
`;

export const TotalChargesWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const InnerWrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DropdownWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: ${({ topPosition }) => topPosition || "50px"};
  width: ${({ width }) => width || "100%"};
  border-radius: 10px;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 999;
  /* padding: 5px; */
`;

export const DropdownItems = styled.div`
  width: 100%;
  border-bottom: 1px solid #80808016;
  padding: 8px;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background-color: #80808016;
  }
`;
