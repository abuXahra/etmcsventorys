import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { EditCompanyContent, EditCompanyWrapper, ImageWrapper, InputPicture, NameAndFileInput  } from './EditCompany.style'
import axios from 'axios'
import companyLogos from '../../../images/placeholder_image.png'
import { toast } from 'react-toastify'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import ContentLoader, {
  List, 
  BulletList,
  Facebook,
  Instagram
} from 'react-content-loader'
import { UserContext } from '../../../components/context/UserContext'


export default function EditCompany() {


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const {user} = useContext(UserContext)
    const token = localStorage.getItem('token');
    
    
    const {companyId} = useParams();

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

    // fax No.
    const [faxNo, setFaxNo] = useState('');
    const [faxNoError, setFaxNoError] = useState(false);

    // email require
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    // tax
    const [tax, setTax] = useState('');


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
    // let [photo, setPhoto] = useState('');
    const [ showPicture, setShowPicture] = useState(true);


       // category initial require
       const [catInitial, setCatInitial] = useState('')
       const [catInitialError, setCatInitialError] = useState(false);
   
        // Item initial require
        const [prodInitial, setProdInitial] = useState('')
        const [prodInitialError, setProdInitialError] = useState(false);
    
         // Supplier initial require
         const [supInitial, setSupInitial] = useState('')
         const [supInitialError, setSupInitialError] = useState(false);
     
          
         // Supplier initial require
         const [purchaseInitial, setPurchaseInitial] = useState('')
         const [purchaseInitialError, setPurchaseInitialError] = useState(false);
     
                   
         // Customer initial require
         const [customerInitial, setCustomerInitial] = useState('')
         const [customerInitialError, setCustomerInitialError] = useState(false);
     
        // Sales initial require
        const [saleInitial, setSaleInitial] = useState('')
        const [saleInitialError, setSaleInitialError] = useState(false);
             
           // Expenses initial require
        const [expenseInitial, setExpenseInitial] = useState('')
        const [expenseInitialError, setExpenseInitialError] = useState(false);
    
                   // saleReturn initial require
            const [saleReturnInitial, setSaleReturnInitial] = useState('')
            const [saleReturnInitialError, setSaleReturnInitialError] = useState(false);
                 
                       // purchaseReturn initial require
            const [purchaseReturnInitial, setPurchaseReturnInitial] = useState('')
            const [purchaseReturnInitialError, setPurchaseReturnInitialError] = useState(false);
                 
    // wastage initial require
            const [wastageInitial, setWastageInitial] = useState('')
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
            setShowPicture(false);
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
        }else if(type === 'wastageInitial'){
            setWastageInitial(e.target.value);
            setWastageInitialError(false);
        }
    }


    // Fetch Company detail function
    useEffect(()=>{
          
        const fetchAllCompany = async() =>{
          setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company/${companyId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                console.log("===========", res.data, "===================");          
              //   setCompanyData(res.data);
                setCompanyName(res.data.companyName);
                setTagLine(res.data.tagLine);
                setBusinessType(res.data.businessType);
                setOwnerName(res.data.ownersName);
                setMobileNumber(res.data.mobileNumber);
                setPhone(res.data.phoneNumber);
                setTax(res.data.taxNumber);
                setFaxNo(res.data.faxNumber);
                setEmail(res.data.companyEmail);
                setCurrencyCode(res.data.currencyCode);
                setCurrencySymbol(res.data.currencySymbol);
                setAddress(res.data.address);
                setFile(res.data.companyLogo)
                
                const prefix = res.data.prefixes?.[0];
                
                if (prefix) {
                    setCatInitial(prefix.category);
                    setProdInitial(prefix.product);
                    setSupInitial(prefix.supply);
                    setPurchaseInitial(prefix.purchase);
                    setCustomerInitial(prefix.customer);
                    setSaleInitial(prefix.sale);
                    setExpenseInitial(prefix.expense);
                    setSaleReturnInitial(prefix.saleReturn);
                    setPurchaseReturnInitial(prefix.purchaseReturn);
                    setWastageInitial(prefix.wastage);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
      
        }
      
        fetchAllCompany();
      },[companyId])


       // update handler function
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
                           const res = await axios.put(`${process.env.REACT_APP_URL}/api/company/${companyId}`, company, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                           console.log(res.data);
                           setIsLoading(false);
                           navigate(`/company-profile/${res.data._id}`);
                           // toast success message
                           toast.success('Company Successful Updated')
                       } catch (err) {
                           setIsLoading(false);  
        
                           toast.error('An error occurred while updating company');
                       }
                       }
                   }
           
                 


  return (
    <EditCompanyWrapper>
    {/* Page title */}
        <PageTitle title={'Company'} subTitle={'/ Update'}/>

        <>{
    isLoading ?
        <List/> :
        <EditCompanyContent>
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
                       
                        <AnyItemContainer>                                                 {/* Email */}
                           
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

                        
                         {/* Company Logo */}
                                                  <NameAndFileInput>
                                                     <label htmlFor="fileInput">
                                                     <span>Logo</span> 
                                                     {showPicture ? 
                                                     (  <ImageWrapper bg={file ? `${process.env.REACT_APP_URL}/images/${file}` : companyLogos}></ImageWrapper>) 
                                                     : (
                                                     <>  { 
                                                     file ?     
                                                         (<ImageWrapper bg={URL.createObjectURL(file)}></ImageWrapper>) 
                                                         : <AiFillPicture />
                                                     }</> 
                                                     )} 
                                                 </label>
                                                     <InputPicture onChange={(e)=>handleChange('file', e)} type="file" id="fileInput" />
                                                  </NameAndFileInput>                           {/* profile picture */}
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
                        <ItemButtonWrapper btnAlign={'flex-start'}>
                            <div>
                            <Button
                                btnText={isLoading? <ButtonLoader text={'Updating...'}/> : 'Update'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditCompanyContent>}</>
        {/* Toast message */}
        <ToastComponents/>
    </EditCompanyWrapper>
 )
}

