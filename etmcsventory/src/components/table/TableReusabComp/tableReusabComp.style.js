import styled from "styled-components";

export const TableReusableWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const TableReusableHeader = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f1f1f1;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  color: #000;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;

  span {
    color: blue;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
