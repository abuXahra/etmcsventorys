import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const CheckboxInputStyle = styled.input`
  border: 1.5px solid ${({ bdColor }) => bdColor || "#0d398420"};
  border-radius: 10px;
  width: 15px;
  height: 15px;
`;
