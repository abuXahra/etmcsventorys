import React from 'react'
import Button from '../../components/clicks/button/Button'
import { NotFoundWrapper } from './notFound.style'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    
    const navigate = useNavigate();

  return (
    <NotFoundWrapper>
        <h1>Oops!</h1>
        <h4>404 PAGE NOT FOUND</h4>
        <span>The page you are looking for might have been removed, had its name changed or is temporarily unavailable</span>
        <Button 
            btnText={'GO TO HOMEPAGE'}
            btnColor={'blue'}
            btnOnClick={()=>navigate('/dashboard')}
         />    
    </NotFoundWrapper>
  )
}

export default NotFound