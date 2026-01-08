import React, { useContext, useState } from 'react'
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
import { AddCompanyContent, AddCompanyWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './AddCompany.style'
import axios from 'axios'
import { toast } from 'react-toastify'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { UserContext } from '../../../components/context/UserContext'


export default function AddCompany() {


    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [isLoading, setIsLoading] = useState(false);
    const {user} = useContext(UserContext)
    const currencyItems =  [
        {
            title: 'select',
            value: ''
        },
        {
            title: 'Dollar',
            value: '&#36;'
        },
        {
            title: 'Naira',
            value: '&#8358;'
        },
    ]

    // Company name
    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState(false);

    // Tag Line
    const [tagLine, setTagLine] = useState('');
    
     // Business Type
     const [businessType, setBusinessType] = useState('');
     const [businessTypeError, setBusinessTypeError] = useState(false);
 
     // Owner Name required
     const [ownerName, setOwnerName] = useState('');
     const [ownerNameError, setOwnerNameError] = useState(false);

    // Mobile No. require
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState(false);

     // phone NO.
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

       // tax
       const [tax, setTax] = useState('');
        // fax No.
    const [faxNo, setFaxNo] = useState('');
    const [faxNoError, setFaxNoError] = useState(false);

    // email require
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);




    // Currency require
    const [currencyCode, setCurrencyCode] = useState('');
    const [currencyCodeError, setCurrencyCodeError] = useState(false);
    
    
    // Currency symbol require
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [currencySymbolError, setCurrencySymbolError] = useState(false);
        

    // address require
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');


       // category initial require
       const [catInitial, setCatInitial] = useState('CA')
       const [catInitialError, setCatInitialError] = useState(false);
   
        // Item initial require
        const [prodInitial, setProdInitial] = useState('PR')
        const [prodInitialError, setProdInitialError] = useState(false);
    
         // Supplier initial require
         const [supInitial, setSupInitial] = useState('SU')
         const [supInitialError, setSupInitialError] = useState(false);
     
          
         // Supplier initial require
         const [purchaseInitial, setPurchaseInitial] = useState('PC')
         const [purchaseInitialError, setPurchaseInitialError] = useState(false);
     
                   
         // Customer initial require
         const [customerInitial, setCustomerInitial] = useState('CU')
         const [customerInitialError, setCustomerInitialError] = useState(false);
     
        // Sales initial require
        const [saleInitial, setSaleInitial] = useState('SA')
        const [saleInitialError, setSaleInitialError] = useState(false);
             
           // Expenses initial require
        const [expenseInitial, setExpenseInitial] = useState('EX')
        const [expenseInitialError, setExpenseInitialError] = useState(false);
             
               // saleReturn initial require
        const [saleReturnInitial, setSaleReturnInitial] = useState('SR')
        const [saleReturnInitialError, setSaleReturnInitialError] = useState(false);
             
                   // purchaseReturn initial require
        const [purchaseReturnInitial, setPurchaseReturnInitial] = useState('RP')
        const [purchaseReturnInitialError, setPurchaseReturnInitialError] = useState(false);

        // wastage initial require
        const [wastageInitial, setWastageInitial] = useState('WA')
        const [wastageInitialError, setWastageInitialError] = useState(false);
             
             


    const handleChange = (type, e) =>{
        if(type === 'name'){
            setCompanyName(e.target.value);
            setCompanyNameError(false);
        }else if(type === 'tag'){
            setTagLine(e.target.value);
        }else if(type === 'businessType'){
            setBusinessType(e.target.value);
            setBusinessTypeError(false);
        }else if(type === 'ownerName'){
            setOwnerName(e.target.value);
            setOwnerNameError(false);
        }else if(type === 'mobile'){
            setMobileNumber(e.target.value);
            setMobileNumberError(false);
        }else if(type === 'phone'){
            setPhone(e.target.value);
            // setPhoneError(false);
        }else if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'faxNo'){
            setFaxNo(e.target.value);
        }else if(type === 'tax'){
            setTax(e.target.value);
        }else if(type === 'currencyCode'){
            setCurrencyCode(e.target.value);
            setCurrencyCodeError(false);
        }else if(type === 'currencySymbol'){
            setCurrencySymbol(e.target.value);
            setCurrencySymbolError(false);
        }else if(type === 'address'){
            setAddress(e.target.value);
            setAddressError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
        }else if(type === 'catInitial'){
            setCatInitial(e.target.value);
            setCatInitialError(false);
        }else if(type === 'prodInitial'){
            setProdInitial(e.target.value);
            setProdInitialError(false);
        }else if(type === 'supInitial'){
            setSupInitial(e.target.value);
            setSupInitialError(false);
        }else if(type === 'purchaseInitial'){
            setPurchaseInitial(e.target.value);
            setPurchaseInitialError(false);
        }else if(type === 'customerInitial'){
            setCustomerInitial(e.target.value);
            setCustomerInitialError(false);
        }else if(type === 'saleInitial'){
            setSaleInitial(e.target.value);
            setSaleInitialError(false);
        }else if(type === 'expenseInitial'){
            setExpenseInitial(e.target.value);
            setExpenseInitialError(false);
        }else if(type === 'saleReturnInitial'){
            setSaleReturnInitial(e.target.value);
            setSaleReturnInitialError(false);
        }else if(type === 'purchaseReturnInitial'){
            setPurchaseReturnInitial(e.target.value);
            setPurchaseReturnInitialError(false);
        }
        else if(type === 'wastageInitial'){
            setWastageInitial(e.target.value);
            setWastageInitialError(false);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!companyName){
            setCompanyNameError(true);
            isValid = false;
        }

        if(!businessType){
            setBusinessTypeError(true);
            isValid = false;
        }

        if(!ownerName){
            setOwnerNameError(true);
            isValid = false;
        }
        
        if(!mobileNumber){
            setMobileNumberError(true);
            isValid = false;
        }
        
        // if(!phone){
        //     setPhoneError(true);
        //     isValid = false;
        // }

        
        if(!email){
            setEmailError(true);
            isValid = false;
        }

        if(!currencyCode){
            setCurrencyCodeError(true);
            isValid = false;
        }
        
        if(!currencySymbol){
            setCurrencySymbolError(true);
            isValid = false;
        }


        if(!address){
            setAddressError(true);
            isValid = false;
        } 

        if(!catInitial){
            setCatInitialError(true);
            isValid = false;
        }

       
        if(!prodInitial){
            setProdInitialError(true);
            isValid = false;
        }

        if(!supInitial){
            setSupInitialError(true);
            isValid = false;
        }

        if(!purchaseInitial){
            setPurchaseInitialError(true);
            isValid = false;
        }


        if(!customerInitial){
            setCustomerInitialError(true);
            isValid = false;
        }

        if(!saleInitial){
            setSaleInitialError(true);
            isValid = false;
        }

       
        if(!saleInitial){
            setSaleInitialError(true);
            isValid = false;
        }


      if(!expenseInitial){
        setExpenseInitialError(true);
            isValid = false;
        }  

     if(!saleReturnInitial){
            setSaleReturnInitialError(true);
            isValid = false;
        }


      if(!purchaseReturnInitial){
        setPurchaseReturnInitialError(true);
            isValid = false;
        }  
       
        if(!wastageInitial){
        setWastageInitialError(true);
            isValid = false;
        } 
        
        if(isValid){
            const company ={
                companyName: companyName,
                tagLine: tagLine,
                businessType: businessType,
                ownersName: ownerName,
                mobileNumber: mobileNumber,
                phoneNumber: phone,
                faxNumber: faxNo,
                taxNumber: tax,
                companyEmail: email,
                currencyCode: currencyCode,
                currencySymbol: currencySymbol,
                address: address,
                category: catInitial,
                product: prodInitial,
                supply: supInitial,
                purchase: purchaseInitial,
                customer: customerInitial,
                sale: saleInitial,
                expense: expenseInitial,
                saleReturn: saleReturnInitial,
                purchaseReturn: purchaseReturnInitial,            
                wastage: wastageInitial,            
                
                userId: user._id,

                       }
                       
                       if (file) {
                           const data = new FormData()
                           const filename = file.name
                           data.append('img', filename)
                           data.append('file', file)
                           company.companyLogo = filename
           
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
                           const res = await axios.post(`${process.env.REACT_APP_URL}/api/company/register`, company, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                           console.log(res.data);
                           setIsLoading(false);
                           navigate(`/company-profile`);
                           // toast success message
                           toast.success('Company Registration Successful')
           
                           setCompanyName('');
                           setTagLine('');
                           setBusinessType('');
                           setOwnerName('');
                           setMobileNumber('');
                           setPhone('');
                           setTax('');
                           setFaxNo('');
                           setEmail('');
                           setCurrencyCode('');
                           setCurrencySymbol('');
                           setAddress('');
                           setFile('');

           
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
    <AddCompanyWrapper>
    {/* Page title */}
        <PageTitle title={'Company'} subTitle={'/ Add'}/>

        <AddCompanyContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'General Setting'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* company name */}
                            <Input 
                                value={companyName} 
                                title={'Company Name'}
                                onChange={(e)=>handleChange('name', e)} 
                                error={companyNameError} 
                                type={'text'} 
                                label={'Company Name'} 
                                requiredSymbol={'*'}
                            />
                        
                        {/* Tag line */}
                            <Input 
                                value={tagLine} 
                                title={'Tag Line'}
                                onChange={(e)=>handleChange('tag', e)} 
                                type={'text'} 
                                label={'Tag Line'} 
                            />


                             {/* Business Type */}
                             <Input 
                                value={businessType} 
                                title={'Business Type'}
                                onChange={(e)=>handleChange('businessType', e)} 
                                error={businessTypeError} 
                                type={'text'} 
                                label={'Business Type'}
                                requiredSymbol={'*'} 
                            />

                        {/* Owners name */}
                            <Input 
                                value={ownerName} 
                                title={'Owners Name'}
                                onChange={(e)=>handleChange('ownerName', e)} 
                                error={ownerNameError} 
                                type={'text'} 
                                label={'Owners Name'}
                                requiredSymbol={'*'} 
                            />

                            {/* Category
                            <SelectInput options={categoryItem} label={'Category'}/>

                            {/* Unit */}
                            {/* <SelectInput options={unitItem} label={'Units'}/> */}
                        </AnyItemContainer> 

                        <AnyItemContainer justifyContent={'space-between'}>
                            
            
                            {/* Mobile No. */}
                            <Input 
                                value={mobileNumber} 
                                title={'Mobile Number'}
                                onChange={(e)=>handleChange('mobile', e)} 
                                error={mobileNumberError} 
                                type={'text'} 
                                label={'Mobile Number'} 
                                requiredSymbol={'*'}
                            />


                            {/* 
                            phone Number */}
                            <Input 
                                value={phone} 
                                title={'Phone No.'}
                                onChange={(e)=>handleChange('phone', e)} 
                                // error={phoneError} 
                                type={'text'} 
                                label={'Phone No.'} 
                            />

                            {/*Fax Number */}
                            <Input 
                                value={faxNo} 
                                title={'Fax Number'}
                                onChange={(e)=>handleChange('faxNo', e)} 
                                // error={phoneError} 
                                type={'text'} 
                                label={'Fax No.'} 
                            />

                           {/* Email */}
                           <Input 
                                value={email} 
                                title={'Email'}
                                onChange={(e)=>handleChange('email', e)} 
                                error={emailError} 
                                type={'email'} 
                                label={'email'}
                                requiredSymbol={'*'} 
                            />
                        </AnyItemContainer>
                       
                        <AnyItemContainer>                                                
                           
                           {/* Tax */}
                           <Input 
                                value={tax} 
                                title={'Tax'}
                                onChange={(e)=>handleChange('tax', e)} 
                                // error={emailError} 
                                type={'text'} 
                                label={'Tax'} 
                            />

                            {/* Currency code */}
                             <Input 
                                value={currencyCode} 
                                title={'Currency Code'}
                                onChange={(e)=>handleChange('currencyCode', e)} 
                                error={currencyCodeError} 
                                type={'text'} 
                                label={'Currency Code'}
                                requiredSymbol={'*'} 
                            />

                            {/* currency symbole */}
                            <SelectInput 
                                onChange={(e)=>handleChange('currencySymbol', e)} 
                                error={currencySymbolError} 
                                options={currencyItems} 
                                label={'Currency Symbol'}
                                title={'Currency Symbol'}    
                                requiredSymbol={"*"}
                                value={currencySymbol} 
                            />
                            
                            
                            
                        </AnyItemContainer>
                        <AnyItemContainer justifyContent={'space-between'}>
                         {/* Address */}
                            <TextArea  
                                label={'Address'}
                                title={'Address'}
                                onChange={(e)=> handleChange('address', e)}
                                value={address}
                                error={addressError}
                                Icon={<FaLocationDot/>}
                                requiredSymbol={'*'}
                            ></TextArea>

                            {/* picture */}
                            <NameAndFileInput>
                            <label htmlFor="fileInput">
                                <span>Logo</span> 
                            { file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                                }</label>
                            <InputPicture onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" />
                         </NameAndFileInput>                              {/* profile picture */}
                        </AnyItemContainer>
                    </ItemContainer>

                    {/* Prefixes */}
                    <ItemContainer title={'Prefixes'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                                                        
                            {/* category Initial */}
                            <Input 
                                value={catInitial} 
                                title={'Category'}
                                onChange={(e)=>handleChange('catInitial', e)} 
                                error={catInitialError} 
                                type={'text'} 
                                label={'Category'}
                                requiredSymbol={'*'} 
                            />  
                            
                            
                            {/* Product Initial */}
                            <Input 
                                value={prodInitial} 
                                title={'Product'}
                                onChange={(e)=>handleChange('prodInitial', e)} 
                                error={prodInitialError} 
                                type={'text'} 
                                label={'Product'}
                                requiredSymbol={'*'} 
                            /> 

                              {/* Suply Initial */} 
                            <Input 
                                value={supInitial} 
                                title={'Supply'}
                                onChange={(e)=>handleChange('supInitial', e)} 
                                error={supInitialError} 
                                type={'text'} 
                                label={'Supply'} 
                                requiredSymbol={'*'}
                            />  
                             <Input 
                                value={purchaseInitial} 
                                title={'Purchase'}
                                onChange={(e)=>handleChange('purchaseInitial', e)} 
                                error={purchaseInitialError} 
                                type={'text'} 
                                label={'Purchase'} 
                                requiredSymbol={'*'}
                            />  
                            <Input 
                                value={customerInitial} 
                                title={'Customer'}
                                onChange={(e)=>handleChange('customerInitial', e)} 
                                error={customerInitialError} 
                                type={'text'} 
                                label={'Customer'}
                                requiredSymbol={'*'}
                            />
                        </AnyItemContainer>

                        <AnyItemContainer>
                          
                             <Input 
                                value={saleInitial} 
                                title={'Sale'}
                                onChange={(e)=>handleChange('saleInitial', e)} 
                                error={saleInitialError} 
                                type={'text'} 
                                label={'Sale'}
                                requiredSymbol={'*'}
                            />  
                             <Input 
                                value={expenseInitial} 
                                title={'Expense'}
                                onChange={(e)=>handleChange('expenseInitial', e)} 
                                error={expenseInitialError} 
                                type={'text'} 
                                label={'Expense'}
                                requiredSymbol={'*'}
                            />  
                            <Input 
                                value={saleReturnInitial} 
                                title={'Sale Return'}
                                onChange={(e)=>handleChange('saleReturnInitial', e)} 
                                error={saleReturnInitialError} 
                                type={'text'} 
                                label={'Sale Return'}
                                requiredSymbol={'*'}
                            />  
                             <Input 
                                value={purchaseReturnInitial} 
                                title={'Purchase Return'}
                                onChange={(e)=>handleChange('purchaseReturnInitial', e)} 
                                error={purchaseReturnInitialError} 
                                type={'text'} 
                                label={'Purchase Return'}
                                requiredSymbol={'*'}
                            />  
                         <Input 
                                value={wastageInitial} 
                                title={'Wastage'}
                                onChange={(e)=>handleChange('wastageInitial', e)} 
                                error={wastageInitialError} 
                                type={'text'} 
                                label={'Wastage'}
                                requiredSymbol={'*'}
                            />  
                        </AnyItemContainer>

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Company'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddCompanyContent>
        {/* ===================Toast Message ================= */}
        <ToastComponents/>
    </AddCompanyWrapper>
  )
}

