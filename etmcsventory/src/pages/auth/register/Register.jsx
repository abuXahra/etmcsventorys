
import React, { useContext, useEffect, useState } from 'react'
import { RegisterWrapper, RegisterContentLeft, FormWrapper, RegisterContent } from './registerB.style'
import Input from '../../../components/input/Input'
import Button from '../../../components/clicks/button/Button';
// import ButtonLoader from '../../components/clicks/button/button_loader/ButtonLoader';
import axios from 'axios';
import { UserContext } from '../../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader';
import RegisterPicture from '../../../images/inventoryimage.png'
import RegisterIcon from '../../../images/icons/icon.png'




export default function Register() {

    console.log('=========\n', `${process.env.REACT_APP_URL}/api/auth/register`, '\n==================')

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [RegisterError, setRegisterError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    const navigate = useNavigate()

// input change handler
    const onChangeHandler = (type, e) =>{
        if(type === 'username'){
            setUsername(e.target.value);
            setUsernameError(false);
        }if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'password'){
            setPassword(e.target.value);
            setPasswordError(false);
        }
    }
    
    // input Register handler
    const onSubmitHandler = async (e) =>{
        
        e.preventDefault();

        if (username === null || username === '') {
            setUsernameError(true);
            toast.error('Username is required');
            return;
        }else if (email === null || email === '') {
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
            const newUser ={
                    username,
                    email,
                    password,
                    phoneNumber: '',
                    taxNumber: '',
                    role: "admin",
                    address: '',
                    imgUrl: '',
            }
                const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, newUser);
            
                toast.success('Register successfully')
                // setUser(userData);    
                setIsLoading(false);
                navigate('/')
            } catch (err) {
                // setRegisterError(true);
                setIsLoading(false)
                         // If email already exists, show the error toast
                            if (err.response && err.response.data && err.response.data.message) {
                                toast.error(err.response.data.message); // Show the email already exists message
                            } else {
                                toast.error('An error occurred while Register In');
                            }
            }

            setEmail('');
            setPassword('')
        }

    }





  return (
    <RegisterWrapper>
    <RegisterContent>
        <RegisterContentLeft>
            <img src={RegisterPicture} alt="" srcset="" />
        </RegisterContentLeft>
       <FormWrapper>
        <img src={RegisterIcon} alt="" srcset="" />
         <h1>EtmcsVentory</h1>
         <p>Please login to your account</p>
        <form onSubmit={onSubmitHandler}>
             <Input
                label={"Username"}
                type={'text'}
                title={"Username"}
                value={username}
                // placeholder={"username"}
                // error={emailError}
                onChange={(e)=>onChangeHandler('username', e)}
                inputPadding={"15px"}
                bdColor={'white'}
                inputWidth={"100%"}
                labelColor={"white"}
                txtColor={'#ffffff'} 
                fontSize={'14px'}
            />

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
                
         <Button btnColor={'orange'} btnPd={'15px 30px'} btnText={isLoading? <ButtonLoader text="Processing..." />  : 'Register'}/>
                {RegisterError && 'Incorrect password or email'}
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
                    /></RegisterContent>
    </RegisterWrapper>
  )
}


{/* <ButtonLoader text={'Processing'}/> */}