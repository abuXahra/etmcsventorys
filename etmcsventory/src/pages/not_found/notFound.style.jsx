import styled from "styled-components";


export const NotFoundWrapper = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    background-color: white;
    text-align: center;
    gap: 20px;
    color: #00032adc;

    h1{
        font-size: 50px;
        font-weight: bold;
    }
    
    span{
        width: 30%;
        line-height: 25px;
    }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;

    span{
        width: 100%;
        line-height: 15px;
    }
  }
`