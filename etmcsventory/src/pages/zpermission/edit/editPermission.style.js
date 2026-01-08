import styled from "styled-components";

export const EditPermissionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const EditPermissionContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
