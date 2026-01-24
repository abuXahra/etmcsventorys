
import React, { useContext, useEffect, useState } from 'react'
import { LoginWrapper, LoginContentLeft, FormWrapper, LoginContent } from './Login.style'
import Input from '../../../components/input/Input'
import Button from '../../../components/clicks/button/Button';
// import ButtonLoader from '../../components/clicks/button/button_loader/ButtonLoader';
import axios from 'axios';
import { UserContext } from '../../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader';
import loginPicture from '../../../images/inventoryimage.png'
import loginIcon from '../../../images/icons/icon.png'




export default function Login() {

    console.log('=========\n', `${process.env.REACT_APP_URL}/api/auth/login`, '\n==================')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {setUser, fetchUser} = useContext(UserContext) // user context

    const navigate = useNavigate()

// input change handler
    const onChangeHandler = (type, e) =>{
        if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'password'){
            setPassword(e.target.value);
            setPasswordError(false);
        }
    }
    
    // input Login handler
    const onSubmitHandler = async (e) =>{
        
        e.preventDefault();

        if (email === null || email === '') {
            setEmailError(true);
            toast.error('Email is required');
            return;
        }else if(password === null || password === '') {
            toast.error('Password is required');
            setPasswordError(true);
            return;
        }else{
            setIsLoading(true);
            try {
            
                const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, { email, password });
            
                // const {token, user: userData} = res.data;
                localStorage.setItem("token", res.data.token);  // ✅ Save JWT to localStorage
                
                
                
                toast.success('Login successfully')
                // setUser(userData);

                await fetchUser();

                setIsLoading(false);
                navigate('/dashboard')
            } catch (err) {
                // setLoginError(true);
                setIsLoading(false)
                         // If email already exists, show the error toast
                            if (err.response && err.response.data && err.response.data.message) {
                                toast.error(err.response.data.message); // Show the email already exists message
                            } else {
                                toast.error('An error occurred while Login In');
                            }
            }

            setEmail('');
            setPassword('')
        }

    }





  return (
    <LoginWrapper>
    <LoginContent>
        <LoginContentLeft>
            <img src={loginPicture} alt="" srcset="" />
        </LoginContentLeft>
       <FormWrapper>
        <img src={loginIcon} alt="" srcset="" />
         <h1>EtmcsVentory</h1>
          {/* <h1>JewelVentory</h1> */}
         <p>Please log in to your account</p>
        <form onSubmit={onSubmitHandler}>
            <Input
                label={"Email"}
                type={'email'}
                title={"Email"}
                value={email}
                // placeholder={"email"}
                // error={emailError}
                onChange={(e)=>onChangeHandler('email', e)}
                inputPadding={"15px"}
                bdColor={'white'}
                inputWidth={"100%"}
                labelColor={"white"}
                txtColor={'#ffffff'} 
                fontSize={'14px'}
            />

             <Input
                label={'Password'}
                type={"password"}
                title={"Password"}
                value={password}
                // placeholder={"password"}
                // error={passwordError}
                onChange={(e)=>onChangeHandler('password', e)}
                inputPadding={"15px"}
                inputWidth={"100%"}
                bdColor={'white'}
                labelColor={"white"}
                txtColor={'#ffffff'} 
                fontSize={'14px'}
                    />
                
         <Button btnColor={'orange'} btnPd={'15px 30px'} btnText={isLoading? <ButtonLoader text="Processing..." />  : 'Login'}/>
                {loginError && 'Incorrect password or email'}
        </form>
        </FormWrapper>
        
         {/* ===================Toast Message ================= */}
                 <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    /></LoginContent>
    </LoginWrapper>
  )
}


{/* <ButtonLoader text={'Processing'}/> */}