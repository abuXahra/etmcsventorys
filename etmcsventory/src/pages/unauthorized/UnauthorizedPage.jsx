
import Button from '../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom';
import { UnauthorizedWrapper } from './unauthorizedPage.style';

function Unauthorized() {
    
    const navigate = useNavigate();

  return (
    <UnauthorizedWrapper>
        <h1>Unauthorized!</h1>
        <h4>PAGE RESTRICTED</h4>
        <span>Only admin have access to this page.<br/> Please contact your admin to give you access</span>
        <Button 
            btnText={'GO TO HOMEPAGE'}
            btnColor={'blue'}
            btnOnClick={()=>navigate('/dashboard')}
         />    
    </UnauthorizedWrapper>
  )
}

export default Unauthorized