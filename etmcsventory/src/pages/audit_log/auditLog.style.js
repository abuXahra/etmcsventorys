import styled from "styled-components";

export const AuditLogWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const AuditLogContent = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cccccc;
  gap: 5px;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
