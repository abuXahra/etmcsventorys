import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { ImageWrapper, InputPicture, NameAndFileInput, SupplierContent, SupplierWrapper } from './addSupplier.style'
import { UserContext } from '../../../components/context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddSupplier() {
const token = localStorage.getItem('token');
    
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    // name
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

// phone
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');

// email
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
// tax
    const [tax, setTax] = useState('');
// address
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false);


    // Fetch supplier initial
        const [supplierInitial, setSupplierInitial] = useState('')
        useEffect(()=>{
          const fetchAllCompany = async() =>{
            // setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`
                                                      }
                                                })
                                  
                  const prefix = res.data[0].prefixes?.[0];
    
                    
                  if (prefix) {
                      setSupplierInitial(prefix.supply);
                  }
    
                //   setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  setIsLoading(false);
              }
        
          }
          fetchAllCompany();
        },[])



    const handleChange = (type, e) =>{
        if(type === 'name'){
            setName(e.target.value);
            setNameError(false);
        }else if(type === 'phone'){
            setPhone(e.target.value);
            setPhoneError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
        }else if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'tax'){
            setTax(e.target.value);
        }else if(type === 'address'){
            setAddress(e.target.value);
            setAddressError(false);
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

        if(!phone){
            setPhoneError(true);
            isValid = false;
        }
        
        if(!address){
            setAddressError(true);
            isValid = false;
        }
        if(isValid){
            setIsLoading(true)
            const newSupplier ={
                name: name,
                email: email,
                phoneNumber: phone,
                taxNumber: tax,
                address: address,
                prefix: supplierInitial,
                userId: user._id,
                // imgUrl
            }

            if (file) {
                const data = new FormData()
                const filename = file.name 
                data.append('img', filename)
                data.append('file', file)
                newSupplier.imgUrl = filename

                // img upload
                try {
                    const imgUpload = await axios.post(`${process.env.REACT_APP_URL}/api/upload'}`, data)
                    console.log(imgUpload.data)
                    } catch (err) {
                        console.log(err)
                    }
                }

                setIsLoading(true)
                        try {
                            const res = await axios.post(`${process.env.REACT_APP_URL}/api/suppliers/register`, newSupplier, {
                                                                headers: {
                                                                  Authorization: `Bearer ${token}`
                                                                }
                                                          })
                            console.log(res.data);
                            setIsLoading(false);
                           
                            // toast success message
                            toast.success(res.data.message || 'Supplier Registration Successful');
            
                            setName('');
                            setEmail('');
                            setPhone('');
                            setTax('');
                            setAddress('');
                            setFile('');
                            setPhoto('');
            

                            navigate('/suppliers')
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
    <SupplierWrapper>
    {/* Page title */}
        <PageTitle title={'Supplier'} subTitle={'/ Add'}/>

        <SupplierContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Supplier'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* name */}
                            <Input 
                                value={name} 
                                title={'Name'}
                                onChange={(e)=>handleChange('name', e)} 
                                error={nameError} 
                                type={'text'} 
                                label={'Name'} 
                            />

                          {/* Email */}
                           <Input 
                                value={email} 
                                title={'Email'}
                                onChange={(e)=>handleChange('email', e)} 
                                error={emailError} 
                                type={'email'} 
                                label={'Email'} 
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
                            />
    
                            {/* Tax Number*/}
                            <Input 
                                value={tax} 
                                onChange={(e)=>handleChange('tax', e)} 
                                type={'text'} 
                                label={'Tax No.'} 
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
                            ></TextArea>
                                                                                                                   {/* profile picture */}
                        <NameAndFileInput>
                            <label htmlFor="fileInput">
                                <span>Picture</span> 
                            { file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                                }</label>
                            <InputPicture onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" />
                         </NameAndFileInput>
                        </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'space-between'}>

                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Supplier'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </SupplierContent>
    </SupplierWrapper>
  )
}

