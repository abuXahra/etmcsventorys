import styled from "styled-components";

export const QuickLinkWrapper = styled.div`
  /* width: fit-content; */
  width: 100%;
  /* align-self: center; */
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid grey;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const QuickLinkHeader = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  color: #000;
`;

export const QuickLinkContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
`;

export const QuickLinkItems = styled.span`
  display: ${({ qds }) => qds || "flex"};
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 8.33%;
  background-color: rgba(241, 241, 241, 0.48);
  font-size: 9px;
  border-radius: 5px;
  border: 1px solid grey;
  cursor: pointer;
  text-align: center;
`;
