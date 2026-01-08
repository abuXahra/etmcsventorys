import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillPicture } from 'react-icons/ai'
import { ImageWrapper, InputPicture, NameAndFileInput, EditUserContent, EditUserWrapper } from './editUser.style'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import Input from '../../../components/input/Input'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import profilPiture from '../../../images/placeholder_image.png'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import axios from 'axios'
import { toast } from 'react-toastify';
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import ContentLoader, {
  List, 
} from 'react-content-loader'

export default function AddUser() {
const token = localStorage.getItem('token');
    
    const navigate = useNavigate();


    const { userId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showPicture, setShowPicture] = useState(true);
    

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

   // name
    const [name, setName] = useState('John Doe');
    const [nameError, setNameError] = useState(false);

    // email
    const [email, setEmail] = useState('johndoe@email.com');
    const [emailError, setEmailError] = useState(false);

    // email
    const [password, setPassword] = useState('12345667890');
    const [passwordError, setPasswordError] = useState(false);

// phone
    const [phone, setPhone] = useState('08000000000');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    // let [photo, setPhoto] = useState('');

// tax
    const [tax, setTax] = useState('2233455');


    // address
    const [address, setAddress] = useState('Mabushi, abUJA')
    const [addressError, setAddressError] = useState(false);

            // role
            const [role, setRole] = useState(roleItems[2].value);
            const [roleError, setRoleError] = useState(false);

    
    // handle input function
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
            setShowPicture(false);
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


    // Fetch user detail function
    useEffect(()=>{
        const fetchUser = async() =>{
            setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/users/${userId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                console.log(res.data);
                setName(res.data.username)
                setEmail(res.data.email)
                setPassword(res.data.password)
                setPhone(res.data.phoneNumber)
                setFile(res.data.imgUrl)
                setTax(res.data.taxNumber)
                setAddress(res.data.address);
                setRole(res.data.role)
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
    
        }
        fetchUser();
    },[userId])



    // update handler function
    const submitHandler = async(e) => {
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

        if(!address){
            setAddressError(true);
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
          
                      setIsBtnLoading(true)
                      try {
                          const res = await axios.put(`${process.env.REACT_APP_URL}/api/users/${userId}`, user, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                          console.log(res.data);
                          setIsBtnLoading(false)
                         
                          // toast success message
                          toast.success('User updated Successfully')
                          navigate(`/users/${res.data._id}`)
          
                      } catch (err) {
                          setIsLoading(false);  
          
                          // If email already exists, show the error toast
                      if (err.response && err.response.data && err.response.data.message) {
                          toast.error(err.response.data.message); // Show the email already exists message
                      } else {
                          toast.error('An error occurred while Updating user');
                      }
                      }
                  }
          
                
              }
          

            //   navigate to userlist handler
            const listHandler = (e) =>{
                e.preventDefault();
                navigate('/users');
            }
  return (
    <EditUserWrapper>
    {/* Page title */}
        <PageTitle title={'User'} subTitle={' / Edit'}/>

       <>
        {isLoading? <List/> :
        <EditUserContent>
            <form>
                    <ItemContainer title={'Edit User'}>
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

                                                        {/* Role */}
                                                      <SelectInput 
                                                          onChange={(e)=>handleChange('role', e)} 
                                                          error={roleError} 
                                                          options={roleItems} 
                                                          value={role}
                                                          label={'Role'}
                                                          title={'Role'}    
                                                          requiredSymbol={"*"}
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
                            {showPicture ? (  <ImageWrapper bg={file ? `${process.env.REACT_APP_URL}/images/${file}` : profilPiture}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) :      
                         (<>  { 
                            file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                            }
                            </> 
                            )} 
                        </label>
                            <InputPicture onChange={(e)=>handleChange('file', e)} type="file" id="fileInput" />
                         </NameAndFileInput>
           </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'flex-start'}>

                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Updating...'}/> : 'Update User'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={submitHandler}
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
                                    btnOnClick={(e)=>listHandler(e)}
                                />
                             </div>
                             
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditUserContent>}</>
       
        
              {/* Toast message user component */}
              <ToastComponents/>
    </EditUserWrapper>
  )
}

