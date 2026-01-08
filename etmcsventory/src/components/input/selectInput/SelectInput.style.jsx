

import styled from "styled-components";


export const SelectInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: ${({InputWidth})=> InputWidth || "100%"};
    gap: 5px;
`

export const SelectInputLabel = styled.label`
     color: #171717;
    font-size: 10px;
    display: flex;
    align-items: center; 
    display: flex;
    flex-direction: row;
    gap: 3px;
    font-weight: bold;

    span{
        /* padding-top: 5px; */
        font-size: 8px;
        color:red;
    }
`

export const SelectInputStyle = styled.select`
    border: 1.5px solid #0d398420; 
     border-radius: 10px;
    padding: 10px;
    width: 100%;
    color: grey;
    font-size: 10px;
    background-color: ${({inputBg}) => inputBg || 'transparent'};
    option{
        font-size: 10px;
    }
    
    &:focus {
    outline: none;

  }
`

export const SelectInputOption= styled.option`
    font-size: 13px;
    color: grey;
`

export const SelectInputError = styled.span`
    color: red;
    font-size: 10px;
`