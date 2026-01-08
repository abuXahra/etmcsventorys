import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { CustomerDetailContent, CustomerDetailData, CustomerDetailPicture, CustomerDetailWrapper, OutStandingWrapper } from './customerDetail.style'
import ItemContainer from '../../../components/item_container/ItemContainer'
import profilePicture from '../../../images/placeholder_image.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { List } from 'react-content-loader'
import { PictureWrapper } from '../../user/detail/userDetail.style'
import Overlay from '../../../components/overlay/Overlay'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { UserContext } from '../../../components/context/UserContext'
import CustomerSalesTable from '../../../components/table/sale_table/customer_sale/CustomerSale'
import Button from '../../../components/clicks/button/Button'
import CustomerPaymentHistoryTable from '../../../components/table/payment_table/CustomerPaymentHistoryB'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Input from '../../../components/input/Input'
import TextArea from '../../../components/input/textArea/TextArea'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import { AddPaymentContent } from '../../payment/add/AddPayment.style'
import { DropdownItems, DropdownWrapper } from '../../purchase/add/addPurchase.style'


  

export default function CustomerDetail() {

  const navigate = useNavigate();

    const {customerId} = useParams();
    const [cusData, setCusData] = useState('');
    const [cusSaleData, setCusSaleData] = useState('');
    const [cusAmountData, setCusAmountData] = useState('');
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabTitle, setGrabTitle] = useState('');
    const token = localStorage.getItem('token');


    // payment variable:
    
        const [items, setItems] = useState([])
    
        const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)
    
        // date
        const [paymentDate, setPaymentDate] = useState(todayDate);
        const [dateError, setDateError] = useState(false);
    
        // payment for
        const [paymentFor, setPaymentFor] = useState('');
        const [paymentForError, setPaymentForError] = useState(false);
    
        // Invoice No.
        const [invoiceNo, setInvoiceNo] = useState('');
        const [invoiceNoError, setInvoiceNoError] = useState(false);
    
        // due amount
        const [dueBalance, setDueBalance] = useState('');
        const [dueAmountError, setDueAmountError] = useState(false);
      
        // payment type
        const [paymentType, setPaymentType] = useState('')
        const [paymentTypeError, setPaymentTypeError] = useState(false);
    
        // payable amount
        const [payableAmount, setPayableAmount] = useState('')
        const [payableAmountError, setPayableAmountError] = useState(false);
    
        // note
        const [note, setNote] = useState('')
           
    
    // payment items
const paymentTypeItems =  [
        {
        title: 'Select',
        value: ''
    },
    {
        title: 'Card',
        value: 'Card'
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Check',
        value: 'Check'
    },
    {
        title: 'Online',
        value: 'Online'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
]

    
        const handleChange = (type, e) =>{
            if(type === 'date'){
                setPaymentDate(e.target.value);
                setDateError(false);
            }else if(type === 'payment-for'){
                setShowItemDropdown(true)
                setPaymentFor(e.target.value);
                setInvoiceNo(e.target.value)
                setPaymentForError(false);
            }else if(type === 'due-amount'){
                setDueBalance(e.target.value);
                setDueAmountError(false);
            }else if(type === 'invoice'){
                setInvoiceNo(e.target.value);
                setInvoiceNoError(false);
            }else if(type === 'payment-type'){
                setPaymentType(e.target.value);
                setPaymentTypeError(false);
            }else if(type === 'payable-amount'){
                setPayableAmount(e.target.value);
                setPayableAmountError(false);
            }else if(type === 'note'){
                setNote(e.target.value);
            }
        }
    

   
    // user permission:
      const {permissions, user} = useContext(UserContext);
      const customerPermission = permissions?.find(p => p.module === "Customer")

            // Permission logic
      const isAdmin = user?.role === 'admin'
      const canEdit = isAdmin || customerPermission?.canEdit
      const canDelete = isAdmin || customerPermission?.canDelete
    

      // Fetch customer detail
        useEffect(()=>{
          const fetchCustomer = async() =>{
            setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/customers/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });        
                  console.log('====== customer data: \n', res.data, '==================')
                  setCusData(res.data);
                  setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  setIsLoading(false);
              }
        
          }
          fetchCustomer();

          // customer sale items
           const fetchCustomerSale = async() =>{
            // setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale/customer/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });        
                  console.log('====== customer sale data: \n', res.data, '==================')
                  setCusSaleData(res.data);
                  console.log(res.data)
                  // setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  // setIsLoading(false);
              }
        
          }
          fetchCustomerSale()


          //customer oustanding items:
          // customer sale items
           const fetchCustomerOutstandingSale = async() =>{
            // setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale/outstanding-sale/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });        
                  console.log('====== customer sale OutSatanding data: \n', res.data.outstandingSales, '==================')
                  setItems(res.data.outstandingSales);
               // setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  // setIsLoading(false);
              }
        
          }
          fetchCustomerOutstandingSale()


          const fetchCustomerAmount = async() =>{
            // setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/sale/customer-summary/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });        
                  console.log('====== customer sale data: \n', res.data, '==================')
                  setCusAmountData(res.data.data);
                  // setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  // setIsLoading(false);
              }
        
          }

          fetchCustomerAmount()          
          const fetchPaymentHistory = async() =>{
            // setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/payment/customer/${customerId}/payment-history`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });        
                  console.log('====== customer sale data: \n', res.data, '==================')
                  setPaymentHistory(res.data.paymentHistory || []);
                  // setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  // setIsLoading(false);
              }
        
          }

          fetchPaymentHistory()
        },[customerId])
        
      
      
      const handleGrabId = (title)=>{
        setShowDeleteCard(true);
        setGrabTitle(title);
      
      }
      
      
        // handle delete
              const deleteCustomer = async (custId) => {
                setIsBtnLoading(true);
                try {
                   
                  await axios.delete(`${process.env.REACT_APP_URL}/api/customers/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                 
                    toast.success('Customer deleted successfully');
                    setShowDeleteCard(false); // Close modal
                    setIsBtnLoading(false);
                    navigate('/customers')
                } catch (error) {
                  return { success: false, message: error.message };
                }
              };
        
      
      const [showPaymentCard, setShowPaymentCard] = useState(false);
      const [showItemDropdown, setShowItemDropdown] = useState(false);
    // search name dropdownd handler
        const dropdownItems = (item) => {
        setShowItemDropdown(false);
        setPaymentFor(item.code);
        setInvoiceNo(item.code);        // set invoiceNo same as code
        setDueBalance(item.dueBalance);   // from DB
        };

    
    console.log('======', items, '========');
    
    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!paymentDate){
            setDateError(true);
            isValid = false;
        }

        if(!paymentFor){
            setPaymentForError(true);
            isValid = false;
        }

        if(!invoiceNo){
            setInvoiceNoError(true);
            isValid = false;
        }

        
        if(!dueBalance){
            setDueAmountError(true);
            isValid = false;
        }
             
        if(!paymentType){
            setPaymentTypeError(true);
            isValid = false;
        }
        if(!payableAmount){
            setPayableAmountError(true);
            isValid = false;
        }

        if(isValid){
            setIsBtnLoading(true)
            
            try {

                const newPayment = {
                    paymentDate,
                    paymentFor: paymentFor,
                    invoiceNo,
                    dueBalance: Number(dueBalance),
                    payableAmount: Number(payableAmount),
                    paymentType,
                    note,
                    useId: user?._id
                }

                const res = await axios.post(`${process.env.REACT_APP_URL}/api/payment/register`, newPayment, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              }) 
                console.log(res.data)
                setShowPaymentCard(false)
                window.location.reload();
                toast.success('Payment added Successfully')

                
            } catch (error) {
              setIsBtnLoading(false);
              console.log(error)   
            }
        }
    }  

  return (
        <CustomerDetailWrapper>
          <PageTitle title={'Customer'} subTitle={'Detail'}/>

          {/* content */}
           <>
                  {isLoading?
                    <List/> :
          <CustomerDetailContent>
            <CustomerDetailData>
              <ItemContainer title={'Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{cusData?.name}</span>
                       </InnerWrapper>
              </AnyItemContainer>
              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{cusData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                 <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                          <span><b>Membership ID</b></span>
                          <span>{cusData?.membershipId}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                          <span><b>Staff ID</b></span>
                          <span>{cusData?.staffId}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{cusData?.email}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{cusData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{cusData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

              {/* Product Sales */}
              <ItemContainer title={'Sales Invoice'}>
                     {/* Sales Table */}
                                <CustomerSalesTable data={cusSaleData} />
              </ItemContainer>

              {/* Payment History */}
 { paymentHistory.length > 0 ?              <ItemContainer title={'Payment History'}>

              <div className="payment-history">

                {paymentHistory.length === 0 ? (<p>No payments found for this customer.</p>) 
                :(<CustomerPaymentHistoryTable data={paymentHistory}/>)}
              </div>
                <OutStandingWrapper>
                            <span>Total Amount Paid: {cusAmountData?.totalPaid}</span>
                            <span>Total Outstanding: {cusAmountData?.totalOutstanding}</span>
                            {cusAmountData?.totalOutstanding > 0 && <span><Button btnColor={'green'} btnText={'Clear Outstanding'} btnOnClick={()=>(setShowPaymentCard(true))}/></span>}       
                    </OutStandingWrapper>
              </ItemContainer>: ''}
            </CustomerDetailData>

            <CustomerDetailPicture>
              <ItemContainer title={'Picture'}> 
                <PictureWrapper imgUrl={cusData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${cusData?.imgUrl}` : profilePicture}></PictureWrapper>        
                {/* <img src={profilePicture} alt="" srcset="" /> */}
              </ItemContainer>

                        <ItemContainer title={'Action'}> 
                               <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                        <span onClick={()=>navigate(`/customers`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                                        <span onClick={()=>navigate(`/customers`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                              {canEdit && <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/customers/${cusData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-customer/${cusData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
                              {canDelete && <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(cusData?.name)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>handleGrabId(cusData?.name)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>}
                            </ItemContainer>
            </CustomerDetailPicture>
          </CustomerDetailContent> 
    }</>

    {/* overlay popup */}
              { showDeleteCard &&
               <Overlay 
               contentWidth={'30%'}
               overlayButtonClick={()=>deleteCustomer(cusData?._id)}
               closeOverlayOnClick={()=>setShowDeleteCard(false)}
               btnText1={isBtnLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
               >
               <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
               Are you sure You want to delete the Customer <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
               </p>
               </Overlay>
               }
         {/* overlay popup */}
              { showPaymentCard &&
               <Overlay 
               contentWidth={'60%'}
               overlayButtonClick={submitHandler}
               closeOverlayOnClick={()=>setShowPaymentCard(false)}
               btnText1={isBtnLoading ? <ButtonLoader text={'Processing'}/> : 'Add Payment'}
               btnText2={'Cancel'}
               >
               <h3>Make Payment</h3>
                <AddPaymentContent>
                           <form action="">
                                   <ItemContainer title={'New Payment'}>
                                       <AnyItemContainer justifyContent={'space-between'}>
                                           {/* Payment for */}
                                           {/* <SelectInput 
                                               onChange={(e)=>handleChange('payment-for', e)} 
                                               error={paymentForError} 
                                               options={items} 
                                               label={'Payment For'}
                                               title={'Payment For'}    
                                           /> */}
               
                <Input 
                                               value={paymentFor} 
                                               title={'Payment For'}
                                               onChange={(e)=>handleChange('payment-for', e)} 
                                               error={paymentForError} 
                                               type={'text'} 
                                               label={'Payment For'} 
                                               placeholder={'search...'}
                                               requiredSymbol={'*'}
                                           />  
                                         {showItemDropdown && (
                                                   <DropdownWrapper topPosition={'70px'} width={"32%"}>
                                                       { items.filter(c =>
                                                           paymentFor.length > 0 &&
                                                           c.code.toLowerCase().includes(paymentFor.toLowerCase())
                                                           ).length > 0 ? (
                                                           items
                                                               .filter(c => 
                                                               paymentFor.length > 0 &&
                                                               c.code.toLowerCase().includes(paymentFor.toLowerCase())
                                                               )
                                                               .map((data, i) => (
                                                               <DropdownItems key={i} onClick={() => dropdownItems(data)}>
                                                                   {data.code}
                                                               </DropdownItems>
                                                               ))
                                                       ) : (
                                                       <DropdownItems>
                                                           <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                               <span>No Item Found </span>
                                                           </div>
                                                       
                                                       </DropdownItems>
                                                       )}
                                                   </DropdownWrapper>
                                           )} 

                                                                 {/* date */}
                                           <Input 
                                               value={paymentDate} 
                                               title={'Date'}
                                               onChange={(e)=>handleChange('date', e)} 
                                               error={dateError} 
                                               type={'date'} 
                                               label={'Date'} 
                                           />
               
                                     {/* Invoice Number */}
                                           <Input 
                                               value={invoiceNo} 
                                               title={'Invoice No.'}
                                               onChange={()=>{}}  
                                               type={'text'} 
                                               error={invoiceNoError}
                                               label={'Invoice No.'} 
                                               readOnly 
                                               inputBg='#c4c4c449'
                                           />     
                                   </AnyItemContainer>
               
                                       <AnyItemContainer justifyContent={'space-between'}>
                                           
                                           {/* Due Amount */}
                                           <Input 
                                               value={dueBalance} 
                                               title={'Due Amount (N)'}
                                               onChange={()=>{}}  
                                               type={'text'} 
                                               label={'Due Amount'} 
                                               readOnly 
                                               inputBg='#c4c4c449'
                                           />
               
                                            {/* Payment Type */}
                                            <SelectInput 
                                               onChange={(e)=>handleChange('payment-type', e)} 
                                               error={paymentTypeError} 
                                               options={paymentTypeItems} 
                                               label={'Payment Type'}
                                               value={paymentType}
                                               title={'Payment Type'}
                                               />
                                     
               
                                          {/* Payable Amount ($) */}
                                          <Input 
                                               value={payableAmount} 
                                               title={'Payable Amount'}
                                               onChange={(e)=>handleChange('payable-amount', e)} 
                                               error={payableAmountError} 
                                               type={'text'} 
                                               label={'Payable Amount'} 
                                           />
                     
                                       </AnyItemContainer>
                                      
                                       <AnyItemContainer justifyContent={'space-between'}>
                                       {/* note */}
                                           <TextArea  
                                               label={'Note'}
                                               title={'Note'}
                                               onChange={(e)=> handleChange('note', e)}
                                               value={note}
                                           ></TextArea>                             {/* profile picture */}
                                       </AnyItemContainer>
                                
               
                                       {/* button
                                       <ItemButtonWrapper btnAlign={'space-between'}>
                                           <div>
                                           <Button
                                               title={'Select Items'}
                                               btnText={isBtnLoading? <ButtonLoader text={'Adding...'}/> : 'Add Payment'}
                                               btnFontSize={'12px'}
                                               btnColor={'Green'}
                                               btnTxtClr={'white'}
                                               btnAlign={'flex-end'}
                                               />
                                           </div>
                                       </ItemButtonWrapper> */}
                                   </ItemContainer>
                               </form>
                       </AddPaymentContent>
               </Overlay>
            }                   
               {/* Toast message user component */}
               <ToastComponents/>
      </CustomerDetailWrapper>
  )
}


