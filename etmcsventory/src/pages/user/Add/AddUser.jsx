import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillPicture } from 'react-icons/ai'
import { ImageWrapper, InputPicture, NameAndFileInput, UserContent, UserWrapper } from './addUser.style'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import Input from '../../../components/input/Input'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"

export default function AddUser() {
const token = localStorage.getItem('token');
    

    const roleItems =  [
        {
            title: 'select',
            value: ''
        },
        {
            title: 'Admin',
            value: 'admin'
        },
        {
            title: 'User',
            value: 'user'
        },  
    ]


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    // name
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    // email
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    // email
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

// phone
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');


// tax
    const [tax, setTax] = useState('');
// address
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false);

        // role
        const [role, setRole] = useState('');
        const [roleError, setRoleError] = useState(false);

    const handleChange = (type, e) =>{
        if(type === 'name'){
            setName(e.target.value);
            setNameError(false);
        }else if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        } if(type === 'password'){
            setPassword(e.target.value);
            setPasswordError(false);
        }else if(type === 'phone'){
            setPhone(e.target.value);
            setPhoneError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
        }else if(type === 'tax'){
            setTax(e.target.value);
        }else if(type === 'address'){
            setAddress(e.target.value);
            setAddressError(false);
        }else if(type === 'role'){
            setRole(e.target.value);
            setRoleError(false);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!name){
            setNameError(true);
            isValid = false;
        }

        if(!email){
            setEmailError(true);
            isValid = false;
        }

        if(!password){
            setPasswordError(true);
            isValid = false;
        }

        if(!phone){
            setPhoneError(true);
            isValid = false;
        }


        if(!role) {
            setRoleError(true);
            isValid = false;
        }


        if(isValid){
           
            const user ={
                username: name,
                email: email,
                password: password,
                phoneNumber: phone,
                taxNumber: tax,
                role: role,
                address: address,
                // imgUrl
            }
            
            if (file) {
                const data = new FormData()
                const filename = file.name
                data.append('img', filename)
                data.append('file', file)
                user.imgUrl = filename

                // img upload
                try {
                    const imgUpload = await axios.post(`${process.env.REACT_APP_URL}/api/upload`, data)
                    console.log(imgUpload.data)
                } catch (err) {
                    console.log(err)
                }
            }

            setIsLoading(true)
            try {
                const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, user, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                console.log(res.data);
                setIsLoading(false);
               
                // toast success message
                toast.success('User Registration Successful')

                setName('');
                setEmail('');
                setPassword('');
                setPhone('');
                setTax('');
                setRole('');
                setAddress('');
                setFile('');
                setPhoto('');

            } catch (err) {
                setIsLoading(false);  

                // If email already exists, show the error toast
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); // Show the email already exists message
            } else {
                toast.error('An error occurred while registering');
            }
            }
        }

      
    }

  return (
    <UserWrapper>
    {/* Page title */}
        <PageTitle title={'User'} subTitle={'/ Add'}/>

        <UserContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New User'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* name */}
                            <Input 
                                value={name} 
                                title={'Name'}
                                onChange={(e)=>handleChange('name', e)} 
                                error={nameError} 
                                type={'text'} 
                                label={'Name'} 
                                requiredSymbol={"*"}
                            />

                         {/* Email */}
                           <Input 
                                value={email} 
                                title={'Email'}
                                onChange={(e)=>handleChange('email', e)} 
                                error={emailError} 
                                type={'email'} 
                                label={'Email'}                               
                                requiredSymbol={"*"} 
                            />

                            
                         {/* Password */}
                           <Input 
                                value={password} 
                                title={'Password'}
                                onChange={(e)=>handleChange('password', e)} 
                                error={passwordError} 
                                type={'password'} 
                                label={'Password'}
                                requiredSymbol={"*"} 
                            />                                     
                        </AnyItemContainer>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Phone number */}
                            <Input 
                                value={phone} 
                                title={'Phone'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'text'} 
                                label={'Phone No.'} 
                                requiredSymbol={"*"}
                            />
                            
                            {/* Tax Number*/}
                            <Input 
                                value={tax} 
                                onChange={(e)=>handleChange('tax', e)} 
                                type={'text'} 
                                label={'Tax No.'} 
                            />

                            <SelectInput 
                                onChange={(e)=>handleChange('role', e)} 
                                error={roleError} 
                                options={roleItems} 
                                label={'Role'}
                                title={'Role'}    
                                requiredSymbol={"*"}
                                value={role} 
                            />
                        </AnyItemContainer>
                        <AnyItemContainer justifyContent={'space-between'}>
                            <TextArea  
                                label={'Address'}
                                title={'Address'}
                                onChange={(e)=> handleChange('address', e)}
                                value={address}
                                error={addressError}
                                Icon={<FaLocationDot/>}
                            >
                            </TextArea>
                                                                                                                   {/* profile picture */}
                        <NameAndFileInput>
                            <label htmlFor="fileInput">
                                <span>Picture</span> 
                            { file ?     
                                (<ImageWrapper srcset="profile picture" bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                                }</label>
                            <InputPicture onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" />
                         </NameAndFileInput>
                        </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'flex-start'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add User'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={'View List'}
                                btnFontSize={'12px'}
                                btnColor={'#000045'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={()=> navigate('/users')}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </UserContent>
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
            />
    </UserWrapper>
  )
}

