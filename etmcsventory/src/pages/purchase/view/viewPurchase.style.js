import { StyledEngineProvider } from "@mui/material";
import styled from "styled-components";

export const ViewPurchaseWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const ViewPurchaseContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: 2px solid grey;
  border-radius: 2px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InvoiceWrapper = styled.div`
  width: 100%;
  padding: 30px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  border: "1px solid grey";

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const LogoDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  div {
    width: 150px;
    height: auto;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 5px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    img {
      width: 100%;
      border-radius: 5px;
    }
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 35%;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    div {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 3px;

      div {
        background-color: rgb(35, 139, 0);
        border-radius: 3px;
        padding: 5px 10px;
        color: white;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 45%;
  }
`;

export const InfoBillWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: ${({ jstCont }) => jstCont || ""};
      flex-direction: ${({ clm }) => clm || "column"};
      gap: 2px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    div {
      width: 100%;
    }
  }
`;

export const TableStyled = styled.table`
  width: 100%;
  font-size: 11px;
  color: rgb(27, 27, 27);

  tr:nth-child(even) {
    background-color: rgba(210, 210, 210, 0.24);
  }
`;

export const TdStyled = styled.td`
  span {
    width: 100%;
    padding: 5px;
    color: red;
    cursor: pointer;
    border-radius: 3px;

    span {
      color: black;
    }
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
  width: 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ChargesWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div:nth-child(1) {
    width: 60%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  div:nth-child(2) {
    width: 25%;
    justify-content: space-between;
    gap: 10px;

    div {
      width: 100%;
      font-size: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 3px;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NoteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
  border-top: 1px solid rgba(204, 204, 204, 0.52);
  align-items: center;
  padding: 5px;
`;
