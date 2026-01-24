import styled from "styled-components";


export const LoginWrapper = styled.div`
   width:100% ;
   height: 100vh;
   display: flex;
   background-color: white;
   padding: 50px;


   @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`

export const LoginContent = styled.div`
   width:100% ;
   display: flex;
    background-color: #0037eb16;
    margin:20px;
    border-radius: 100px 0px;
   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   border: 1px solid #00032af7;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    border-radius: 0px;
    margin:0px;
    justify-content: center;
    align-items:center;
  }
`



export const LoginContentLeft = styled.div`
 width: 50%;
 display: flex;
 justify-content: center;
 align-items: center;
 /* background-color: white; */
 /* margin-top:20px;
 margin-bottom:20px;
 margin-left:20px;
 border-top: 2px solid #00032a;
 border-bottom: 2px solid #00032a;
 border-left: 2px solid #00032a;
 border-right: 20px;
 border-top-left-radius: 20px;
 border-bottom-left-radius: 20px; */

img{
     height: 400px;
  }

@media (max-width: 768px) {
    width: 100%;
    display: none;
  }
`

export const FormWrapper = styled.div`
    width: 50%;
    color: white;
    /* background-color: #002300ff; */
    background-color: #023603;
    display:flex;
    flex-direction: column;
    padding-left:100px;
    padding-right: 100px;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 100px 0px;
    position: relative;
    display: flex;
    p{font-size: 13px;}
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        // padding: 0px 40px;
        gap: 10px;
    }
    
        img{
            height: 50px;
        }

        
    @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    padding-left:10px;
    padding-right: 10px;;
    font-size: 13px;
    border-radius: 0px;
  }
  `

